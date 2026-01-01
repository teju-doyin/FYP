"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { formatFeedbackDate } from "@/lib/utils";
import Comments from "./Comments";

interface Todo {
  id: number;
  todo: string;
}

interface FeedbackItem {
  id: string;            // ui id
  feedbackDocId: string; // index (or doc id if you later move to subcollection)
  dateLabel: string;
  chapterId: number;
  chapterName: string;
  status: 0 | 1 | 2;     // 0: action required, 1: needs correction, 2: approved
  feedbackTodo: Todo[];
}

const chapterTitles = [
  "Introduction",
  "Literature Review",
  "Methodology",
  "Implementation",
  "Summary",
];

function mapStatus(status: string): 0 | 1 | 2 {
  if (status === "action-required") return 0;
  if (status === "needs-correction") return 1;
  return 2;
}

const FeedbackScreen = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [supervisorId, setSupervisorId] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!user?.uid) return;

      setLoading(true);

      const docRef = doc(db, "users", user.uid, "students", user.uid);
      const snap = await getDoc(docRef);
      const data = snap.data() as any;

      setSupervisorId(data?.assignedSupervisorId || null);

      const chapters = data?.chapters || {};
      const result: FeedbackItem[] = [];

      Object.entries(chapters).forEach(([chKey, chValue]: [string, any]) => {
        const chNum = Number(chKey);
        const chTitle = chapterTitles[chNum - 1] ?? `Chapter ${chNum}`;
        const history: any[] = chValue?.feedbackHistory || [];

        history.forEach((f, index) => {
          const ts = f.createdAt as Timestamp | undefined;
          const dateObj = ts?.toDate ? ts.toDate() : new Date();
          const dateLabel = formatFeedbackDate(dateObj);

          result.push({
            id: `${chKey}-${index}`,
            feedbackDocId: String(index),
            dateLabel,
            chapterId: chNum,
            chapterName: chTitle,
            status: mapStatus(f.status),
            feedbackTodo: [
              {
                id: 0,
                todo: f.message || "",
              },
            ],
          });
        });
      });

      result.sort((a, b) => (a.dateLabel < b.dateLabel ? 1 : -1));

      setItems(result);
      setLoading(false);
    };

    run().catch((e) => {
      console.error(e);
      setLoading(false);
    });
  }, [user?.uid]);

  if (loading) {
    return <p className="text-grey-400 text-sm">Loading feedback...</p>;
  }

  return (
    <div className="w-[95%] mx-auto">
      {items.map((feedback) => {
        console.log("feedback render", {
          feedbackId: feedback.id,
          supervisorId,
          openId,
          userUid: user?.uid,
        });

        return (
          <div className="mb-4" key={feedback.id}>
            <p className="text-grey-600 font-light mb-1">
              {feedback.dateLabel}
            </p>
            <div className="card py-2">
              <div className="flex-between items-end mb-2">
                <h2 className="text-grey-500">
                  Chapter {feedback.chapterId} - {feedback.chapterName}
                </h2>
                <div className="tag flex">
                  <p
                    className={`${
                      feedback.status === 0
                        ? "bg-[#FDE6E6]"
                        : feedback.status === 1
                        ? "bg-[#FFFAE5]"
                        : "bg-[#0B9F1E]/10"
                    } flex gap-1 items-end p-1 rounded-[3px]`}
                  >
                    <Image
                      src={`/icons/${
                        feedback.status === 0
                          ? "action-required"
                          : feedback.status === 1
                          ? "warning"
                          : "approved"
                      }.png`}
                      alt="tag"
                      width={20}
                      height={20}
                    />
                    <span
                      className={`text-[12px] ${
                        feedback.status === 0
                          ? "text-red"
                          : feedback.status === 1
                          ? "text-yellow"
                          : "text-green"
                      }`}
                    >
                      {feedback.status === 0
                        ? "Action Required"
                        : feedback.status === 1
                        ? "Needs Correction"
                        : "Approved"}
                    </span>
                  </p>
                </div>
              </div>

              <ul className="mb-3">
                {feedback.feedbackTodo.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-start gap-1 mb-1 list-none"
                  >
                    <span className="dot bg-grey-200 mt-2" />
                    <span className="text-[14px] font-light text-grey-600">
                      {todo.todo}
                    </span>
                  </li>
                ))}
              </ul>

              {openId === feedback.id && user?.uid && (
                <>
                  <div className="line my-3" />
                  <Comments
                    studentId={user.uid}
                    supervisorId={supervisorId || ""} // safe default
                    chapterId={feedback.chapterId}
                    feedbackDocId={feedback.feedbackDocId}
                  />
                </>
              )}

              <p
                className="underline text-blue-500 text-[12px] text-right block font-semibold cursor-pointer"
                onClick={() =>
                  setOpenId((prev) =>
                    prev === feedback.id ? null : feedback.id
                  )
                }
              >
                {openId === feedback.id ? "See less" : "See more"}
              </p>
            </div>
          </div>
        );
      })}

      {items.length === 0 && (
        <p className="text-grey-400 text-sm mt-4">
          No feedback yet. You will see your supervisor&apos;s comments here
          once they review your chapters.
        </p>
      )}
    </div>
  );
};

export default FeedbackScreen;
