"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  collectionGroup,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

type SubmissionCard = {
  id: string; // `${studentUid}:ch${chapter}`
  projectTitle: string;
  chapterNumber: number;
  chapterTitle: string;
  dateLabel: string;
  studentUid: string;
  studentName: string;
  studentAvatarUrl: string;

  // for opening the file later if you want
  bucket?: string;
  objectKey?: string;
};

const chapterTitles = [
  "Introduction",
  "Literature Review",
  "Methodology",
  "Implementation",
  "Summary",
];

function reviewKey(supervisorUid: string, studentUid: string, chapter: number) {
  return `reviewed:${supervisorUid}:${studentUid}:ch${chapter}`;
}

function formatDate(ts?: any) {
  const t = ts as Timestamp | undefined;
  if (!t?.toDate) return "—";
  return t.toDate().toLocaleDateString();
}

export default function Submission() {
  const router = useRouter();
  const { user } = useAuth(); // supervisor
  const supervisorUid = user?.uid;

  const [cards, setCards] = useState<SubmissionCard[]>([]);
  const [loading, setLoading] = useState(true);

  // used only to re-render after clicking "Review"
  const [tick, setTick] = useState(0);

  // 1) Listen to supervisee progress docs (collectionGroup)
  useEffect(() => {
    if (!supervisorUid) return;

    setLoading(true);

    const q = query(
      collectionGroup(db, "students"),
      where("assignedSupervisorId", "==", supervisorUid)
    );

    const unsub = onSnapshot(
      q,
      async (snap) => {
        // Build cards from each supervisee doc
        const results: SubmissionCard[] = [];

        for (const d of snap.docs) {
          const progress = d.data() as any;

          // In your structure, the progress doc id is the student uid
          const studentUid = d.id;

          // Fetch student profile for display (name/title)
          const userSnap = await getDoc(doc(db, "users", studentUid));
          const userData = (userSnap.data() as any) || {};

          // Walk through chapters 1..5 and add those that are complete
          for (let ch = 1; ch <= 5; ch++) {
            const chKey = String(ch);
            const chData = progress?.chapters?.[chKey];
            if (!chData) continue;

            if (chData.status !== "complete") continue; // show only pending reviews

            results.push({
              id: `${studentUid}:ch${ch}`,
              projectTitle: userData.projectTitle ?? "—",
              chapterNumber: ch,
              chapterTitle: chapterTitles[ch - 1] ?? `Chapter ${ch}`,
              dateLabel: formatDate(chData?.submission?.uploadedAt),
              studentUid,
              studentName: userData.fullName ?? userData.email ?? studentUid,
              studentAvatarUrl: userData.avatarUrl ?? "/pfp-2.png",
              bucket: chData?.submission?.bucket,
              objectKey: chData?.submission?.objectKey,
            });
          }
        }

        // optional: newest first if uploadedAt exists (simple sort)
        results.sort((a, b) => (a.dateLabel < b.dateLabel ? 1 : -1));

        setCards(results);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setCards([]);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [supervisorUid]);

  const handleOpen = (card: SubmissionCard) => {
    if (!supervisorUid) return;

    localStorage.setItem(reviewKey(supervisorUid, card.studentUid, card.chapterNumber), "1");
    setTick((t) => t + 1); // re-render once, no loop

    router.push(`/supervisor/submissions/documentView/${card.studentUid}/${card.chapterNumber}`);
  };

  const labelFor = (card: SubmissionCard) => {
    if (!supervisorUid) return "Review";
    // tick is referenced so label updates right after click
    void tick;
    return localStorage.getItem(reviewKey(supervisorUid, card.studentUid, card.chapterNumber)) === "1"
      ? "Continue review"
      : "Review";
  };

  if (loading) return <p className="text-grey-200">Loading...</p>;

  return (
    <div className="space-y-5">
      {cards.map((submission) => (
        <div key={submission.id} className="card shadow py-2 px-2">
          <div className="flex-between items-start mb-1">
            <p className="text-grey-700 text-[18px] font-semibold">
              Chapter {submission.chapterNumber} - {submission.chapterTitle}
            </p>
            <span className="text-grey-200 font-light">{submission.dateLabel}</span>
          </div>

          <h2 className="text-grey-400 font-light text-[18px] max-w-2xs">
            {submission.projectTitle}
          </h2>

          <div className="line"></div>

          <div className="flex-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src={submission.studentAvatarUrl}
                alt={submission.studentName}
                width={30}
                height={30}
              />
              <p className="font-light text-blue-500">{submission.studentName}</p>
            </div>

            <button type="button" onClick={() => handleOpen(submission)} className="flex gap-2 items-center">
              <p className="text-blue-500">{labelFor(submission)}</p>
              <Image src="/icons/arrow-right.png" alt="arrow-right" width={10} height={10} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
