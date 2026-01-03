// src/context/ApprovalNotificationContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

type ApprovalInfo = {
  chapterNumber: number;
} | null;

type Ctx = {
  approval: ApprovalInfo;
  close: () => void;
};

const ApprovalNotificationContext = createContext<Ctx | undefined>(undefined);

export const useApprovalNotification = () => {
  const ctx = useContext(ApprovalNotificationContext);
  if (!ctx) throw new Error("useApprovalNotification must be used inside provider");
  return ctx;
};

export const ApprovalNotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [approval, setApproval] = useState<ApprovalInfo>(null);

  useEffect(() => {
    if (!user?.uid) return;

    const ref = doc(db, "users", user.uid, "students", user.uid);

    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.data() as any;
      if (!data?.chapters) return;

      // find chapters that are approved
      Object.entries<any>(data.chapters).forEach(([key, value]) => {
        if (value?.status === "approved") {
          const chapterNumber = Number(key);
          // show notification for the latest approved chapter
          setApproval({ chapterNumber });
        }
      });
    });

    return () => unsub();
  }, [user?.uid]);

  const close = () => setApproval(null);

  return (
    <ApprovalNotificationContext.Provider value={{ approval, close }}>
      {children}
      {/* Global modal rendered once for the whole app */}
      {approval && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div className="w-[90%] max-w-md rounded-lg bg-white p-6 text-center">
            <p className="mb-4 text-lg font-semibold text-blue-900">
              Chapter {approval.chapterNumber} has been approved by your supervisor.
            </p>
            <button
              className="mt-2 rounded bg-blue-800 px-4 py-2 text-white"
              onClick={close}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </ApprovalNotificationContext.Provider>
  );
};
