"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import type { NotificationItem } from "@/types/notifications";
import NotificationCard from "./NotificationCard";

type Tab = "all" | "comment" | "feedback" | "submission";

const NotificationsMenu: React.FC = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("all");

  useEffect(() => {
    if (!user?.uid) return;

    const ref = collection(db, "notifications");
    const q = query(
      ref,
      where("receiverId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const list: NotificationItem[] = snap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          type: data.type,
          receiverId: data.receiverId,
          studentId: data.studentId,
          chapterId: data.chapterId,
          feedbackDocId: data.feedbackDocId,
          commentId: data.commentId,
          title: data.title,
          preview: data.preview,
          read: !!data.read,
          createdAt: data.createdAt?.toDate?.() ?? new Date(),
        };
      });
      setItems(list);
    });

    return () => unsub();
  }, [user?.uid]);

  const isStudentView = items.some((n) => n.studentId === user?.uid);
  const tabs: Tab[] = isStudentView
    ? ["all", "comment", "feedback"]
    : ["all", "comment", "submission"];

  const filtered =
    activeTab === "all"
      ? items
      : items.filter((n) => {
          if (activeTab === "comment") return n.type === "comment";
          if (activeTab === "feedback") return n.type === "feedback";
          if (activeTab === "submission") return n.type === "submission";
          return true;
        });

  return (
    <div className="relative">
      <div>
        <div className="flex mb-4 bg-white rounded-sm shadow-sm border overflow-hidden border-b border-gray-100 text-xs font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 px-3 py-2 border-b-2 ${
                activeTab === tab
                  ? "border-blue-800 text-blue-800"
                  : "border-transparent text-grey-300"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto space-y-2">
          {filtered.length === 0 && (
            <p className="text-gray-400 text-center pt-44">
              No notifications yet.
            </p>
          )}

          {filtered.map((item) => (
            <NotificationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsMenu;
