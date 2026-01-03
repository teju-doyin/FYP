// src/lib/getCurrentChapter.ts
"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  ChapterMeta,
  chapters as chapterConfig,
  Milestone,
} from "@/types/ChapterData";

export function useCurrentChapter(userUid: string | null) {
  const [currentChapterNumber, setCurrentChapterNumber] =
    useState<number | null>(null);
  const [currentChapterData, setCurrentChapterData] =
    useState<ChapterMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userUid) {
      setLoading(false);
      setCurrentChapterNumber(null);
      setCurrentChapterData(null);
      return;
    }

    const ref = doc(db, "users", userUid, "students", userUid);

    const unsub = onSnapshot(
      ref,
      (snap) => {
        const data = snap.data() as any;
        if (!data) {
          setCurrentChapterNumber(null);
          setCurrentChapterData(null);
          setLoading(false);
          return;
        }

        // Firestore only decides which chapter is current
        const chapterNumber: number = data.currentChapter ?? 1;
        setCurrentChapterNumber(chapterNumber);

        // static definition (title, descriptions, base milestones)
        const base = chapterConfig.find((c) => c.id === chapterNumber);
        if (!base) {
          setCurrentChapterData(null);
          setLoading(false);
          return;
        }

        const firestoreChapter = data.chapters?.[String(chapterNumber)] || {};

        // Merge per‑student milestone status from Firestore
        const milestones: Milestone[] = base.milestones.map((m) => {
          const fsMilestone = firestoreChapter.milestones?.[m.id];
          if (!fsMilestone) return m;
          return { ...m, status: fsMilestone.status ?? m.status };
        });

        const chapterMeta: ChapterMeta = {
          ...base,
          milestones,
          checklist: base.checklist,
          // keep due date from config, or override from Firestore if you want:
          // dueDate: firestoreChapter.dueDate ?? base.dueDate,
          dueDate: base.dueDate,
        };

        setCurrentChapterData(chapterMeta);
        setLoading(false);
      },
      (err) => {
        console.error("useCurrentChapter listener error:", err);
        setCurrentChapterNumber(null);
        setCurrentChapterData(null);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [userUid]);

  return { currentChapterNumber, currentChapterData, loading };
}
