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

  // student if this notification belongs to their project
  const isStudent = user.uid === item.studentId;
  const isSupervisor = !isStudent;

  const handleReplySend = async () => {
    if (!replyText.trim() || !isSupervisor) return;

    setSending(true);
    const message = replyText.trim();

    try {
      // 1) write reply into same comments thread (under the student)
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

      const replyDoc = await addDoc(commentsRef, {
        userId: user.uid,
        userName: user.fullName || "Supervisor",
        userType: "supervisor" as const,
        message,
        createdAt: serverTimestamp(),
        parentId: item.commentId ?? null,
        likedBy: [],
      });

      // 2) create notification for student
      const notificationsRef = collection(db, "notifications");
      await addDoc(notificationsRef, {
        type: "comment",
        receiverId: item.studentId,
        studentId: item.studentId,
        chapterId: item.chapterId,
        feedbackDocId: item.feedbackDocId,
        commentId: replyDoc.id,
        title: "Your supervisor left a comment",
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
        {/* Avatar */}
        <Image
          src="/pfp.png"
          alt="Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />

        <div className="flex-1">
          {/* Title + meta */}
          <p className="text-sm font-semibold text-gray-900">{item.title}</p>
          <p className="text-[11px] text-gray-400">
            {formattedDate} • {formattedTime}
          </p>

          {/* Preview */}
          <p className="mt-1 text-grey-700">{item.preview}</p>

          {isSupervisor ? (
            <>
              {/* Supervisor: reply inline */}
              <button
                className="mt-2 text-[14px] font-semibold text-blue-500"
                onClick={() => setReplyOpen((v) => !v)}
              >
                {replyOpen ? "Cancel" : "Reply"}
              </button>

              {replyOpen && (
                <div className="mt-2">
                  <textarea
                    className="w-full border border-grey-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    rows={3}
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="mt-2 flex justify-end">
                    <Button
                      className="px-3 py-1 bg-blue-500 text-white rounded-md"
                      onClick={handleReplySend}
                      disabled={!replyText.trim() || sending}
                    >
                      {sending ? "Sending..." : "Send reply"}
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Student: only view feedback */}
              <Button
                className="mt-2 px-3 py-1 text-xs bg-blue-500 text-white rounded-md"
                onClick={handleViewFeedback}
              >
                View feedback
              </Button>
            </>
          )}
        </div>

        {/* Unread dot */}
        {!item.read && (
          <span className="mt-2 w-2 h-2 rounded-full bg-blue-500" />
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
