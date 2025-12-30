"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

interface ChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (chapterId: number) => void;
}

interface Chapter {
  id: number; // 0-based for UI
  title: string;
  status: string; // display label
  statusCode: number; // 0=approved, 1=complete, 2=not_started
}

const chapterTitles = [
  "Introduction",
  "Literature Review",
  "Methodology",
  "Implementation",
  "Summary",
];

const toUiStatus = (raw?: string) => {
  const v = (raw ?? "not_started").toLowerCase();
  if (v === "approved") return { label: "Approved", code: 0 };
  if (v === "complete") return { label: "Complete", code: 1 };
  return { label: "Not Started", code: 2 };
};

const SelectChapterModal: React.FC<ChapterModalProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  const { user } = useAuth();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !user?.uid) return;

    setLoading(true);

    const ref = doc(db, "users", user.uid, "students", user.uid);

    // Firestore supports real-time document listeners using onSnapshot(). [web:486]
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const data = snap.data() as any;

        const next: Chapter[] = chapterTitles.map((title, index) => {
          // Firestore map keys are "1".."5" in your DB, but UI index is 0..4
          const key = String(index + 1);
          const ui = toUiStatus(data?.chapters?.[key]?.status);

          return {
            id: index,
            title,
            status: ui.label,
            statusCode: ui.code,
          };
        });

        setChapters(next);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to listen to chapters:", err);
        // fallback
        setChapters(
          chapterTitles.map((title, index) => ({
            id: index,
            title,
            status: "Not Started",
            statusCode: 2,
          }))
        );
        setLoading(false);
      }
    );

    return () => unsub();
  }, [isOpen, user?.uid]);

  // Current chapter = first non-approved (complete or not_started)
  const currentChapterIndex = useMemo(() => {
    return chapters.findIndex((ch) => ch.statusCode === 1 || ch.statusCode === 2);
  }, [chapters]);

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="modal-background modal-open">
        <div className="modal-box">
          <div className="w-[90%] mx-auto pt-5 flex items-center justify-center h-48">
            <p className="text-gray-500">Loading chapters...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`modal-background ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <div className="w-[90%] mx-auto pt-5">
          <p className="text-center text-[#535862] mb-4">
            You can only submit the chapter you're currently working on
          </p>

          <ul className="space-y-3">
            {chapters.map((chapter) => {
              const isCurrent = chapter.id === currentChapterIndex;
              const isSelectable = isCurrent || chapter.status === "complete";

              return (
                <li key={chapter.id} className="list-none">
                  <ul className="flex-between mb-3 items-center">
                    <div className="flex gap-2 items-center">
                      <span>
                        {chapter.statusCode === 0 ? (
                          <Checkbox
                            className="data-[state=checked]:bg-green data-[state=checked]:border-green size-5"
                            checked
                            disabled
                          />
                        ) : chapter.statusCode === 1 ? (
                          <Checkbox
                            className="border border-blue-200 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 size-5"
                            checked
                            disabled={!isSelectable}
                          />
                        ) : (
                          <Checkbox
                            className="bg-grey-100 data-[state=checked]:bg-blue-500 size-5"
                            disabled={!isSelectable}
                          />
                        )}
                      </span>

                      <div className="text-grey-700">
                        <span
                          className={`${
                            isCurrent
                              ? "font-semibold text-blue-800"
                              : "font-light"
                          }`}
                        >
                          Chapter {chapter.id + 1} -{" "}
                        </span>
                        <span
                          className={`text-[15px] ${
                            isCurrent
                              ? "font-semibold text-blue-800"
                              : "font-light"
                          }`}
                        >
                          {chapter.title}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs ${
                          chapter.statusCode === 0
                            ? "text-green font-semibold"
                            : chapter.statusCode === 1
                            ? "text-blue-500 font-semibold"
                            : "text-grey-200"
                        }`}
                      >
                        {chapter.status}
                      </span>
                    </div>
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="line"></div>

        <div className="flex flex-col w-[90%] mx-auto gap-4">
          <Button
            variant="secondary"
            className="py-6 bg-blue-800 text-white text-lg hover:bg-blue-800"
            onClick={() => onContinue(currentChapterIndex)}
            disabled={currentChapterIndex === -1}
          >
            Continue
          </Button>

          <Button
            variant="outline"
            className="py-6 text-lg text-blue-800"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectChapterModal;
