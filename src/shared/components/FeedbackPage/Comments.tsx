"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface FirestoreComment {
  id: string;
  userId: string;
  userName: string;
  userType: "student" | "supervisor";
  message: string;
  createdAt?: any;
  parentId: string | null;
  likedBy?: string[];
}

interface CommentsProps {
  studentId: string;
  supervisorId: string;
  chapterId: number;
  feedbackDocId: string;
}

const Comments: React.FC<CommentsProps> = ({
  studentId,
  supervisorId,
  chapterId,
  feedbackDocId,
}) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<FirestoreComment[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);

  // listen for comments
  useEffect(() => {
    if (!studentId || !feedbackDocId) return;

    const commentsRef = collection(
      db,
      "users",
      studentId,
      "students",
      studentId,
      "chapters",
      String(chapterId),
      "feedbackHistory",
      String(feedbackDocId),
      "comments",
    );

    const q = query(commentsRef, orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const list: FirestoreComment[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }));
      setComments(list);
    });

    return () => unsub();
  }, [studentId, chapterId, feedbackDocId]);

  const handleSend = async () => {
    if (!input.trim() || !user?.uid || !studentId || !feedbackDocId) return;

    setLoading(true);
    const message = input.trim();

    try {
      // 1) write to comments thread (always under the student)
      const commentsRef = collection(
        db,
        "users",
        studentId,
        "students",
        studentId,
        "chapters",
        String(chapterId),
        "feedbackHistory",
        String(feedbackDocId),
        "comments",
      );

      const currentUserName =
        user.fullName ||
        (user.uid === studentId ? "Student" : "Supervisor");

      const commentDoc = await addDoc(commentsRef, {
        userId: user.uid,
        userName: currentUserName,
        userType: user.uid === studentId ? "student" : "supervisor",
        message,
        createdAt: serverTimestamp(),
        parentId: replyTo,
        likedBy: [],
      });

      // 2a) notification for supervisor when student comments
      if (user.uid === studentId && supervisorId) {
        const notificationsRef = collection(db, "notifications");
        await addDoc(notificationsRef, {
          type: "comment",
          receiverId: supervisorId,
          studentId,
          chapterId,
          feedbackDocId,
          commentId: commentDoc.id,
          title: currentUserName,
          preview: message.slice(0, 80),
          read: false,
          createdAt: serverTimestamp(),
        });
      }

      // 2b) notification for student when supervisor replies
      if (user.uid === supervisorId) {
        const notificationsRef = collection(db, "notifications");
        await addDoc(notificationsRef, {
          type: "comment",
          receiverId: studentId,
          studentId,
          chapterId,
          feedbackDocId,
          commentId: commentDoc.id,
          title: currentUserName,
          preview: message.slice(0, 80),
          read: false,
          createdAt: serverTimestamp(),
        });
      }

      setInput("");
      setReplyTo(null);
    } catch (e) {
      console.error("Error sending comment:", e);
    } finally {
      setLoading(false);
    }
  };

  const topLevel = useMemo(
    () => comments.filter((c) => c.parentId === null),
    [comments],
  );

  const repliesFor = (id: string) =>
    comments.filter((c) => c.parentId === id);

  return (
    <div>
      <div className="flex-between items-center mb-3">
        <div className="flex gap-1 items-center">
          <Image
            src="/icons/comment.png"
            alt="Comments"
            width={20}
            height={20}
          />
          <span className="text-grey-300">Comments</span>
        </div>
        <Image
          src="/icons/arrow-up.png"
          alt="Toggle"
          width={20}
          height={20}
        />
      </div>

      <div className="comment-1 mb-4">
        {topLevel.map((comment) => (
          <div key={comment.id} className="mb-4">
            <div className="flex-between items-end mb-2">
              <div className="flex gap-1 items-center">
                <Image
                  src={`/${
                    comment.userType === "student" ? "pfp" : "supervisor-pfp"
                  }.png`}
                  alt="Profile"
                  width={30}
                  height={30}
                />
                <span className="font-semibold text-blue-500">
                  You
                </span>
              </div>
            </div>

            <p className="text-[#272727] font-light mb-2">
              {comment.message}
            </p>

            <div className="mt-4 ml-1 space-y-3">
              {repliesFor(comment.id).map((reply) => (
                <div key={reply.id}>
                  <div className="flex gap-1 ">
                    <div className="w-[2px] border border-dashed border-grey-50 rounded-sm "></div>
                    <div className="ml-1">
                      <div className="flex gap-2 items-center mb-1">
                        <Image
                          src={`/${
                            reply.userType === "student"
                              ? "pfp"
                              : "supervisor-pfp"
                          }.png`}
                          alt="Profile"
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                        <p className="font-semibold text-blue-500">
                          {reply.userName}
                        </p>
                      </div>
                      <p className="text-[#272727] font-light">
                        {reply.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex-between items-center mt-2">
                    <button
                      type="button"
                      className="flex gap-1 items-end"
                      onClick={() => setReplyTo(comment.id)}
                    >
                      <Image
                        src="/icons/reply.png"
                        alt="Reply"
                        width={20}
                        height={20}
                      />
                      <span className="text-[14px] text-[#8991A0]">
                        Reply
                      </span>
                    </button>
                    <Image
                      src={`/icons/${
                        comment.likedBy?.includes(user?.uid || "")
                          ? "like-filled"
                          : "like"
                      }.png`}
                      alt="Like"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="relative mb-3 space-y-2">
        <Textarea
          className="py-1.5 placeholder:font-light placeholder:text-[#9E9EA8] break-all"
          placeholder={replyTo ? "Replying..." : "Type your comment here"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            !e.shiftKey &&
            (e.preventDefault(), handleSend())
          }
        />
        <div className="flex justify-end">
          <Button
            variant="secondary"
            className={`${
              input.trim() ? "bg-blue-800" : "bg-blue-200"
            } ${
              loading ? "text-grey-200" : "text-white"
            } px-3 py-1.5 hover:bg-blue-500 cursor-pointer`}
            onClick={handleSend}
            disabled={!input.trim() || loading}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
