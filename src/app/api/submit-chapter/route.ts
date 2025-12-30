import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import admin from "firebase-admin";

export const runtime = "nodejs";

function initFirebaseAdmin() {
  if (admin.apps.length) return;

  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    initFirebaseAdmin();

    // 1) Verify Firebase ID token
    const authHeader = req.headers.get("authorization") || "";
    const idToken = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : null;

    if (!idToken) {
      return NextResponse.json({ error: "Missing auth token" }, { status: 401 });
    }

    const decoded = await admin.auth().verifyIdToken(idToken);
    const uid = decoded.uid;

    // 2) Read form-data
    const form = await req.formData();
    const chapter = Number(form.get("chapter"));
    const file = form.get("file") as File | null;

    if (!file || !chapter) {
      return NextResponse.json(
        { error: "file and chapter are required" },
        { status: 400 }
      );
    }

    // 3) Supabase upload
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const bucket = "chapter-submissions";
    const objectKey = `${uid}/chapter-${chapter}/${Date.now()}_${file.name}`;

    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(objectKey, bytes, { contentType: file.type, upsert: false });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 400 });
    }

    // 4) Firestore transaction:
    // - read current chapter status + previous objectKey
    // - set status = complete (unless already approved)
    // - save new submission pointer
    // Then delete old file (outside transaction) if needed.
    const db = admin.firestore();
    const userRef = db.collection("users").doc(uid).collection("students").doc(uid);


    let oldObjectKey: string | null = null;
    let statusAfterWrite: string = "complete";

    await db.runTransaction(async (tx) => {
      const snap = await tx.get(userRef);

      const data = snap.exists ? (snap.data() as any) : {};
      const chapterData = data?.chapters?.[chapter];

      const existingStatus = chapterData?.status as string | undefined;
      oldObjectKey = chapterData?.submission?.objectKey ?? null;

      // Don't downgrade approved chapters
      statusAfterWrite = existingStatus === "approved" ? "approved" : "complete";

      tx.set(
        userRef,
        {
          chapters: {
            [chapter]: {
              status: statusAfterWrite,
              submission: {
                provider: "supabase",
                bucket,
                objectKey,
                originalFileName: file.name,
                fileSize: file.size,
                uploadedAt: admin.firestore.FieldValue.serverTimestamp(),
              },
            },
          },
          currentChapter: chapter,
          lastSubmission: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    });

    // 5) Delete previous Supabase file if it exists and is different
    // Supabase remove() takes an array of file paths. [page:17]
    if (oldObjectKey && oldObjectKey !== objectKey) {
      const { error: removeError } = await supabase.storage
        .from(bucket)
        .remove([oldObjectKey]);

      // Optional: log but don't fail the whole request
      if (removeError) console.warn("Failed to remove old file:", removeError);
    }

    return NextResponse.json({
      ok: true,
      bucket,
      objectKey,
      status: statusAfterWrite,
      replaced: !!oldObjectKey && oldObjectKey !== objectKey,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
