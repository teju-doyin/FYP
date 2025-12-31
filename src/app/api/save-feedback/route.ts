// app/api/save-feedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

import "@/lib/firebaseAdmin";

type Status = "action-required" | "needs-correction" | "approved";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : null;

    if (!token) {
      console.warn("save-feedback: missing token");
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }

    // Verify Firebase ID token (supervisor)
    const decoded = await getAuth().verifyIdToken(token);
    const supervisorUid = decoded.uid;
    console.log("save-feedback: supervisorUid =", supervisorUid);

    const body = await req.json();
    const {
      studentUid,
      chapter,
      message,
      status,
    }: {
      studentUid?: string;
      chapter?: number;
      message?: string;
      status?: Status;
    } = body || {};

    console.log("save-feedback body:", body);

    if (!studentUid || !chapter || !message || !status) {
      console.warn("save-feedback: missing required fields", {
        studentUid,
        chapter,
        messagePresent: !!message,
        status,
      });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = getFirestore();
    const docRef = db
      .collection("users")
      .doc(studentUid)
      .collection("students")
      .doc(studentUid);


    await docRef.set(
    {
        chapters: {
        [String(chapter)]: {
            feedback: {
            message,
            status,
            supervisorUid,
            createdAt: FieldValue.serverTimestamp(), // OK here
            },
            feedbackHistory: FieldValue.arrayUnion({
            message,
            status,
            supervisorUid,
            createdAt: new Date(), // use a normal Date inside the array
            }),
        },
        },
    },
    { merge: true }
    );


    console.log("save-feedback: write completed");

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("save-feedback error", e);
    return NextResponse.json(
      { error: e?.message || "Failed to save feedback" },
      { status: 500 }
    );
  }
}
