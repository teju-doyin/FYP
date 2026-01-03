// app/api/save-feedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getFirestore,
  FieldValue,
  Transaction,
} from "firebase-admin/firestore";
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
    const studentRef = db
      .collection("users")
      .doc(studentUid)
      .collection("students")
      .doc(studentUid);

    await db.runTransaction(async (tx: Transaction) => {
      const snap = await tx.get(studentRef);
      const data = (snap.data() as any) || {};
      const chapters = data.chapters || {};

      const chapterKey = String(chapter);
      const existingChapterData = chapters[chapterKey] || {};

      // always append feedback + history on the nested chapter object
      const baseUpdate: any = {
        [`chapters.${chapterKey}.feedback`]: {
          message,
          status,
          supervisorUid,
          createdAt: FieldValue.serverTimestamp(),
        },
        [`chapters.${chapterKey}.feedbackHistory`]:
          FieldValue.arrayUnion({
            message,
            status,
            supervisorUid,
            createdAt: new Date(),
          }),
      };

      // if approved, mark this chapter approved + progress 100,
      // and move currentChapter to the next one
      if (status === "approved") {
        const nextChapter = chapter + 1;

        Object.assign(baseUpdate, {
          // update the same nested chapter object your UI reads
          [`chapters.${chapterKey}.status`]: "approved",
          [`chapters.${chapterKey}.progress`]: 100,

          currentChapter: nextChapter,

          // initialise next chapter tracker on the nested map
          [`chapters.${String(nextChapter)}.status`]:
            chapters[String(nextChapter)]?.status ?? "not_started",
          [`chapters.${String(nextChapter)}.progress`]:
            chapters[String(nextChapter)]?.progress ?? 0,
        });
      }

      tx.set(studentRef, baseUpdate, { merge: true });
    });

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
