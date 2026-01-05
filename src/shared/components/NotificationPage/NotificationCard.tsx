"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import type { NotificationItem } from "@/types/notifications";

interface Props {
  item: NotificationItem;
}

const NotificationCard: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  if (!user) return null;

  const isStudent = user.uid === item.studentId;
  const isSupervisor = !isStudent;

  const handleReplySend = async () => {
    if (!replyText.trim() || !isSupervisor) return;

    setSending(true);
    const message = replyText.trim();

    try {
      const commentsRef = collection(
        db,
        "users",
        item.studentId,
        "students",
        item.studentId,
        "chapters",
        String(item.chapterId),
        "feedbackHistory",
        String(item.feedbackDocId),
        "comments"
      );

      const currentUserName =
        (user as any).fullName ||
        (user as any).displayName ||
        (user as any).email ||
        "Supervisor";

      const replyDoc = await addDoc(commentsRef, {
        userId: user.uid,
        userName: currentUserName,
        userType: "supervisor" as const,
        message,
        createdAt: serverTimestamp(),
        parentId: item.commentId ?? null,
        likedBy: [],
      });

      const notificationsRef = collection(db, "notifications");
      await addDoc(notificationsRef, {
        type: "comment",
        receiverId: item.studentId,
        studentId: item.studentId,
        chapterId: item.chapterId,
        feedbackDocId: item.feedbackDocId,
        commentId: replyDoc.id,
        // show supervisor name as title
        title: currentUserName,
        preview: message.slice(0, 80),
        read: false,
        createdAt: serverTimestamp(),
      });

      setReplyText("");
      setReplyOpen(false);
    } catch (e) {
      console.error("Error sending supervisor reply from notification:", e);
    } finally {
      setSending(false);
    }
  };

  const handleViewFeedback = () => {
    router.push(
      `/feedback?student=${item.studentId}&chapter=${item.chapterId}&feedback=${item.feedbackDocId}`
    );
  };

  const handleViewSubmission = () => {
    router.push(
      `/submissions?student=${item.studentId}&chapter=${item.chapterId}`
    );
  };

  const formattedDate = item.createdAt.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const formattedTime = item.createdAt.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-sm bg-white shadow-sm border border-gray-100 p-3">
      <div className="flex items-start gap-2">
        <Image
          src={`${isSupervisor ? "/pfp.png" : "/supervisor-pfp.png"}`}
          alt="Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />

        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">{item.title}</p>
          <p className="text-[11px] text-gray-400">
            {formattedDate} • {formattedTime}
          </p>

          <p className="mt-1 text-grey-700">{item.preview}</p>

          {isSupervisor ? (
            <>
              {item.type === "submission" && (
                <Button
                  className="mt-2 px-3 py-1 text-xs bg-blue-500 text-white rounded-md"
                  onClick={handleViewSubmission}
                >
                  View submission
                </Button>
              )}

              {item.type === "comment" && (
                <>
                  <button
                    className="mt-2 text-[14px] font-semibold text-blue-500 cursor-pointer"
                    onClick={() => setReplyOpen((v) => !v)}
                  >
                    {replyOpen ? "Cancel" : "Reply"}
                  </button>

                  {replyOpen && (
                    <div className="mt-2">
                      <textarea
                        className="w-full border border-grey-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        rows={3}
                        placeholder="Type your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div className="mt-2 flex justify-end">
                        <Button
                          className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer"
                          onClick={handleReplySend}
                          disabled={!replyText.trim() || sending}
                        >
                          {sending ? "Sending..." : "Send reply"}
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {item.type === "feedback" && (
                <Button
                  className="mt-2 px-3 py-1 text-xs bg-blue-500 text-white rounded-md cursor-pointer"
                  onClick={handleViewFeedback}
                >
                  View feedback
                </Button>
              )}

              {item.type === "comment" && (
                <Button
                  className="mt-2 px-3 py-1 text-xs bg-blue-500 text-white rounded-md cursor-pointer"
                  onClick={handleViewFeedback}
                >
                  View comment
                </Button>
              )}
            </>
          )}
        </div>

        {!item.read && (
          <span className="mt-2 w-2 h-2 rounded-full bg-blue-500" />
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
