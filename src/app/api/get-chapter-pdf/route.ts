import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import admin from "firebase-admin";

export const runtime = "nodejs";

function initFirebaseAdmin() {
  if (admin.apps.length) return;

  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
  );

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
    const supervisorUid = decoded.uid;

    // 2) Read payload
    const { studentUid, chapter } = await req.json();
    const chapterNum = Number(chapter);

    if (!studentUid || !chapterNum) {
      return NextResponse.json(
        { error: "studentUid and chapter are required" },
        { status: 400 }
      );
    }

    // 3) Read Firestore progress doc
    const db = admin.firestore();
    const progressRef = db
      .collection("users")
      .doc(studentUid)
      .collection("students")
      .doc(studentUid);

    const snap = await progressRef.get();
    if (!snap.exists) {
      return NextResponse.json(
        { error: "Student progress not found" },
        { status: 404 }
      );
    }

    const data = snap.data() as any;

    // Optional: enforce assignment
    if (
      data?.assignedSupervisorId &&
      data.assignedSupervisorId !== supervisorUid
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const chapterKey = String(chapterNum);
    const submission = data?.chapters?.[chapterKey]?.submission;

    if (!submission?.bucket || !submission?.objectKey) {
      return NextResponse.json(
        { error: "No submission for this chapter" },
        { status: 404 }
      );
    }

    // 4) Create Supabase signed URL [page:0]
    const supabase = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string
    );

    const expiresIn = 60 * 10; // 10 minutes
    const { data: signed, error } = await supabase.storage
      .from(submission.bucket)
      .createSignedUrl(submission.objectKey, expiresIn);

    if (error || !signed?.signedUrl) {
      return NextResponse.json(
        { error: error?.message || "Failed to create signed URL" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      signedUrl: signed.signedUrl,
      originalFileName: submission.originalFileName ?? null,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
