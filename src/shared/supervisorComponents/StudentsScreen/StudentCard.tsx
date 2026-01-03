"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import CircularProgress from "./CircularProgress";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Student = {
  id: string;
  name: string;
  matricNo: string;
  avatarUrl: string;
  progress: number; // 0–100 for current chapter
  projectTopic: string;
  projectDescription: string;
  lastSubmissionLabel: string; // e.g. "Chapter 2"
  currentChapter: number
};

const StudentCard: React.FC = () => {
  const { user } = useAuth(); // supervisor
  const [students, setStudents] = useState<Student[]>([]);
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);

  useEffect(() => {
  if (!user?.uid) return;

  const usersRef = collection(db, "users");
  const q = query(usersRef, where("assignedSupervisorId", "==", user.uid));

  const unsub = onSnapshot(q, async (snap) => {
    const list = await Promise.all(
      snap.docs.map(async (d) => {
        const data = d.data() as any;
        const studentId = d.id;

        // student subdocument
        const studentRef = doc(db, "users", studentId, "students", studentId);
        const studentSnap = await getDoc(studentRef);
        const studentData = (studentSnap.data() as any) || {};

        // current chapter number
        const currentChapter: number = studentData.currentChapter || 0;

        // live progress from nested chapters map
        const chapters = studentData.chapters || {};
        const currentChapterData = chapters[String(currentChapter)] || {};
        const chapterProgress = Number(currentChapterData.progress ?? 0);

        const lastSubmissionLabel = currentChapter
          ? `Chapter ${currentChapter}`
          : "No submission yet";

        const student: Student = {
          id: studentId,
          name: data.fullName || "Unnamed student",
          matricNo: data.matricNumber || "",
          avatarUrl: data.avatarUrl || "/pfp.png",
          progress: chapterProgress, // use nested map progress
          projectTopic: data.projectTitle || "No topic yet",
          projectDescription: data.projectDescription || "No description yet",
          lastSubmissionLabel,
          currentChapter,
        };

        return student;
      }),
    );

    setStudents(list);
  });

  return () => unsub();
}, [user?.uid]);


  return (
    <div>
      <div className="space-y-5">
        {students.map((student) => (
          <div key={student.id} className="card rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-between items-start mb-2">
              <div className="flex gap-3">
                <Image
                  src={student.avatarUrl}
                  alt={student.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-[15px] font-semibold text-slate-900">
                    {student.name}
                  </p>
                  <p className="text-[13px] text-slate-500">
                    Matric No: {student.matricNo}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveStudent(student)}
                className="p-1 rounded-full hover:bg-slate-100"
              >
                <Image
                  src="/icons/more-info.png"
                  alt="More info"
                  width={30}
                  height={30}
                />
              </button>
            </div>

            <p className="text-[18px] text-slate-700 mb-2 leading-snug line-clamp-2">
              {student.projectTopic}
            </p>

            <div className="flex items-center gap-2">
              <CircularProgress value={student.progress} />
              <p className="text-[14px] text-blue-800">
                {student.progress}% complete in Chapter {student.currentChapter || "–"}
              </p>
            </div>
          </div>

        ))}

        <Dialog
          open={!!activeStudent}
          onOpenChange={() => setActiveStudent(null)}
        >
          {activeStudent && (
            <DialogContent className="max-w-sm rounded-2xl px-6 py-6">
              <div className="flex flex-col items-center text-center gap-2 mb-1">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-1">
                  <Image
                    src={activeStudent.avatarUrl}
                    alt={activeStudent.name}
                    width={64}
                    height={64}
                  />
                </div>
                <div>
                  <p className="text-[18px] font-semibold text-gray-800">
                    {activeStudent.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Matric No: {activeStudent.matricNo}
                  </p>
                </div>
              </div>

              <div className="flex justify-center mb-5">
                <div className="flex items-center gap-2">
                  <CircularProgress value={activeStudent.progress} />
                  <p className="text-[18px] text-blue-500">
                    {activeStudent.progress}%
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-[16px] font-medium text-gray-600 mb-1">
                  Project Topic
                </p>
                <p className="text-[18px] text-justify font-[400] text-grey-700 leading-snug">
                  {activeStudent.projectTopic}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-[16px] font-medium text-gray-600 mb-1">
                  Project Description
                </p>
                <p className="text-[18px] text-justify font-[400] leading-snug max-h-40 overflow-y-auto text-grey-700">
                  {activeStudent.projectDescription}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex gap-1 items-center">
                  <Image
                    src="/icons/submission-history.png"
                    alt="Submission history"
                    width={16}
                    height={16}
                  />
                  <span className="text-sm text-grey-200">
                    Chapter in progress:
                  </span>
                </div>
                <span className="font-medium text-grey-700">
                  Chapter {activeStudent.currentChapter}
                </span>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default StudentCard;
