"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

interface ChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (chapterId: number) => void; // 0-based index
  studentUid: string | undefined; // Firestore id of the student
}

interface Chapter {
  id: number;          // 0-based
  title: string;
  status: string;      // Approved / Complete / In Progress / Not Started
  statusCode: number;  // 0=approved, 1=active, 2=not_started
  progress: number;    // 0–100
  isComplete: boolean; // derived from progress === 100
}

const chapterTitles = [
  "Introduction",
  "Literature Review",
  "Methodology",
  "Implementation",
  "Summary",
];

// status mapping
const toUiStatus = (raw?: string) => {
  const v = (raw ?? "not_started").toLowerCase();

  if (v === "approved") return { label: "Approved", code: 0 };
  if (v === "complete") return { label: "Complete", code: 1 };
  if (v === "in_progress") return { label: "In Progress", code: 1 };

  return { label: "Not Started", code: 2 };
};

const SelectChapterModal: React.FC<ChapterModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  studentUid,
}) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [acknowledgedCurrent, setAcknowledgedCurrent] = useState(false);
  const [currentChapterNumber, setCurrentChapterNumber] =
    useState<number | null>(null); // 1-based from Firestore

  useEffect(() => {
    console.log("SelectChapterModal useEffect", { isOpen, studentUid });

    if (!isOpen || !studentUid) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const ref = doc(db, "users", studentUid, "students", studentUid);
    console.log("Listening to doc path:", ref.path);

    const unsub = onSnapshot(
      ref,
      (snap) => {
        console.log("onSnapshot success, exists:", snap.exists());
        const data = snap.data() as any;
        console.log("raw doc:", data);
        console.log("raw chapters:", data?.chapters);

        if (!data || !data.chapters) {
  // Default state for brand-new student
        const defaultChapters: Chapter[] = chapterTitles.map((title, index) => ({
          id: index,
          title,
          status: index === 0 ? "Not Started" : "Not Started",
          statusCode: index === 0 ? 1 : 2, // 1 = active, 2 = not_started
          progress: 0,
          isComplete: false,
        }));

        setChapters(defaultChapters);
        setCurrentChapterNumber(1); // start at Chapter 1
        setLoading(false);
        setAcknowledgedCurrent(false);
        return;
      }


        const current = data.currentChapter ?? 1;
        setCurrentChapterNumber(current);

        const next: Chapter[] = chapterTitles.map((title, index) => {
          const key = String(index + 1);
          const chapterData = data?.chapters?.[key] ?? {};

          // supervisor-sourced flattened fields (may contain "approved")
          const flatStatus = data?.[`chapters.${key}.status`];
          const flatProgress = data?.[`chapters.${key}.progress`];

          // milestone-sourced nested fields
          const nestedStatus = chapterData.status;
          const nestedProgress = chapterData.progress ?? 0;

          // Prefer "approved" from flat fields, otherwise fall back to nested
          const rawStatus =
            typeof flatStatus === "string" &&
            flatStatus.toLowerCase() === "approved"
              ? flatStatus
              : nestedStatus ?? flatStatus;

          const progress =
            typeof flatStatus === "string" &&
            flatStatus.toLowerCase() === "approved"
              ? flatProgress ?? 100
              : nestedProgress;

          console.log("chapterData for key", key, {
            chapterData,
            flatStatus,
            flatProgress,
            nestedStatus,
            nestedProgress,
            rawStatus,
            progress,
          });

          const ui = toUiStatus(rawStatus);

          let statusLabel = ui.label;
          let statusCode = ui.code;
          const isComplete = progress === 100;

          // NEVER touch Approved
          if (statusLabel !== "Approved") {
            if (isComplete && statusLabel !== "Complete") {
              statusLabel = "Complete";
              statusCode = 1;
            } else if (progress > 0 && progress < 100) {
              statusLabel = "In Progress";
              statusCode = 1;
            }
          }

          console.log("final chapter", key, { ui, progress, statusLabel });

          return {
            id: index,
            title,
            status: statusLabel,
            statusCode,
            progress,
            isComplete,
          };
        });

        console.log("mapped chapters:", next);

        setChapters(next);
        setLoading(false);
        setAcknowledgedCurrent(false);
      },
      (err) => {
        console.error("Failed to listen to chapters:", err);
        setChapters(
          chapterTitles.map((title, index) => ({
            id: index,
            title,
            status: "Not Started",
            statusCode: 2,
            progress: 0,
            isComplete: false,
          })),
        );
        setCurrentChapterNumber(1);
        setLoading(false);
        setAcknowledgedCurrent(false);
      },
    );

    return () => {
      console.log("Unsubscribing from chapters listener");
      unsub();
    };
  }, [isOpen, studentUid]);

  // convert 1-based currentChapterNumber to 0-based index
  const currentChapterIndex = useMemo(() => {
    if (!currentChapterNumber) return -1;
    return currentChapterNumber - 1;
  }, [currentChapterNumber]);

  const currentChapter =
    currentChapterIndex >= 0 ? chapters[currentChapterIndex] : null;

  const canSubmitCurrentChapter =
    !!currentChapter && currentChapter.isComplete;

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

  const handleAcknowledge = () => {
    if (!currentChapter) return;
    if (!currentChapter.isComplete || currentChapter.status !== "Complete") {
      return;
    }
    setAcknowledgedCurrent((prev) => !prev);
  };

  const continueDisabled =
    currentChapterIndex === -1 || !canSubmitCurrentChapter || !acknowledgedCurrent;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-[95%] mx-auto max-w-md overflow-y-auto rounded-lg bg-white pb-4">
        <div className="w-[90%] mx-auto pt-5">
          <p className="text-center text-[#535862] mb-4">
            You can only submit the chapter you&apos;re currently working on
          </p>

          <ul className="space-y-3">
            {chapters.map((chapter) => {
              const isApproved = chapter.status === "Approved";
              const isCurrent = chapter.id === currentChapterIndex;

              const checkboxClickable =
                !isApproved &&
                isCurrent &&
                chapter.status === "Complete" &&
                chapter.isComplete;

              const handleClick = checkboxClickable ? handleAcknowledge : undefined;

              const checkboxChecked =
                isApproved
                  ? true
                  : isCurrent && checkboxClickable
                  ? acknowledgedCurrent
                  : false;

              return (
                <li key={chapter.id} className="list-none">
                  <ul className="flex-between mb-3 items-center">
                    <div className="flex gap-2 items-center">
                      <button
                        type="button"
                        onClick={handleClick}
                        className={`flex items-center justify-center ${
                          checkboxClickable ? "cursor-pointer" : "cursor-default"
                        }`}
                      >
                        {isApproved ? (
                          <Checkbox
                            className="size-5 text-white data-[state=checked]:bg-[green] data-[state=checked]:border-green"
                            checked
                            disabled
                          />
                        ) : (
                          <Checkbox
                            className={`${
                              !checkboxClickable
                                ? "bg-grey-300"
                                : "bg-white border-blue-800 cursor-pointer"
                            } size-5 border border-blue-200  data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500`}
                            checked={checkboxChecked}
                            disabled={!checkboxClickable}
                          />
                        )}
                      </button>

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
                        className={`text-sm ${
                          isApproved
                            ? "text-green font-semibold"
                            : chapter.status === "In Progress"
                            ? "text-orange font-semibold"
                            : chapter.status === "Complete"
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

        {currentChapter && !canSubmitCurrentChapter && (
          <p className="w-[90%] mx-auto mt-3 text-red-500 text-center">
            You have to complete all milestones for Chapter{" "}
            {currentChapter.id + 1} before you can submit.
          </p>
        )}

        <div className="line"></div>

        <div className="flex flex-col w-[90%] mx-auto gap-4">
          <Button
            variant="secondary"
            className="py-6 cursor-pointer bg-blue-800 text-white text-lg hover:bg-blue-800 disabled:bg-blue-200 disabled:cursor-not-allowed"
            onClick={() => onContinue(currentChapterIndex)}
            disabled={continueDisabled}
          >
            Continue
          </Button>

          <Button
            variant="outline"
            className="py-6 text-lg text-blue-800 cursor-pointer"
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
