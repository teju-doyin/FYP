"use client";

import Image from "next/image";
import React, { useState } from "react";
import CircularProgress from "./CircularProgress";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";


type Student = {
  id: string;
  name: string;
  matricNo: string;
  avatarUrl: string;
  progress: number; // 0–100
  projectTopic: string;
  projectDescription: string;
  lastSubmissionLabel: string;
};

const students: Student[] = [
  {
    id: "1",
    name: "Sandrah Peter",
    matricNo: "223422",
    avatarUrl: "/pfp-3.png",
    progress: 20,
    projectTopic: "Development of Mobile App for Blood Donation",
    projectDescription:
      "Design and implementation of a mobile platform that connects blood donors with nearby recipients and hospitals, with real-time availability and requests.",
    lastSubmissionLabel: "Chapter 2 - Literature Review",
  },
  {
    id: "2",
    name: "Joanne Wilson",
    matricNo: "221105",
    avatarUrl: "/pfp.png",
    progress: 45,
    projectTopic: "Smart Timetable Scheduling System for University Students",
    projectDescription:
      "A web-based tool that generates conflict-free timetables, integrates course registrations, and sends automated reminders to students.",
    lastSubmissionLabel: "Chapter 3 - Methodology",
  },
  {
    id: "3",
    name: "Kevin Smith",
    matricNo: "220987",
    avatarUrl: "/pfp-2.png",
    progress: 70,
    projectTopic: "Online Final Year Project Repository for CS Department",
    projectDescription:
      "A centralized repository that stores completed projects, supports search by keywords, and enforces plagiarism checks.",
    lastSubmissionLabel: "Chapter 4 - System Design",
  },
  {
    id: "4",
    name: "Timothy Garrager",
    matricNo: "219854",
    avatarUrl: "/pfp-3.png",
    progress: 10,
    projectTopic: "IoT-Based Classroom Attendance Monitoring System",
    projectDescription:
      "An RFID and web-enabled system that captures attendance data and generates reports for lecturers and administrators.",
    lastSubmissionLabel: "Proposal",
  },
  {
    id: "4",
    name: "Timothy Garrager",
    matricNo: "219854",
    avatarUrl: "/pfp-3.png",
    progress: 10,
    projectTopic: "IoT-Based Classroom Attendance Monitoring System",
    projectDescription:
      "An RFID and web-enabled system that captures attendance data and generates reports for lecturers and administrators.",
    lastSubmissionLabel: "Proposal",
  },
  {
    id: "4",
    name: "Timothy Garrager",
    matricNo: "219854",
    avatarUrl: "/pfp-3.png",
    progress: 10,
    projectTopic: "IoT-Based Classroom Attendance Monitoring System",
    projectDescription:
      "An RFID and web-enabled system that captures attendance data and generates reports for lecturers and administrators.",
    lastSubmissionLabel: "Proposal",
  },
];

const StudentCard = () => {
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);

  return (
    <div className=''>
        <div className="space-y-5">
            {students.map((student)=>(
                <div className="card shadow"
                key={student.id}>
                    <div className="flex-between items-center mb-4">
                        <div className="flex gap-3">
                            <div>
                                <Image
                                    src={student.avatarUrl}
                                    alt={student.name}
                                    width={45}
                                    height={45}
                                />
                            </div>
                            <div className="">
                                <p className='text-[16px] font-semibold text-grey-700'>{student.name}</p>
                                <p className='text-[16px] font-light text-grey-700'>Matric No: {student.matricNo}</p>
                            </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveStudent(student)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Image
                            src="/icons/more-info.png"
                            alt="More info"
                            width={24}
                            height={24}
                          />
                        </button>
                    </div>
                    <div className="flex-between items-end">
                        <p className='text-[18px] font- text-grey-500 max-w-[18rem]'>{student.projectTopic}</p>
                        <div className="flex items-end gap-2">
                          <CircularProgress value={student.progress} />
                          <p className='text-[18px] font- text-blue-500'>{student.progress}%</p>
                        </div>
                        
                    </div>
                </div>
            ))}
            <Dialog open={!!activeStudent} onOpenChange={() => setActiveStudent(null)}>
            {activeStudent && (
              <DialogContent className="max-w-sm rounded-2xl px-6 py-6">
                {/* Top avatar + name */}
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

                {/* Progress circle centered */}
                <div className="flex justify-center mb-5">
                  <div className="flex items-center gap-2">
                    <CircularProgress value={activeStudent.progress} />
                    <p className='text-[18px] font- text-blue-500'>{activeStudent.progress}%</p>
                  </div>
                </div>

                {/* Project Topic */}
                <div className="mb-3">
                  <p className="text-[16px] font-medium text-gray-600 mb-1">
                    Project Topic
                  </p>
                  <p className="text-[18px] text-justify font-[400] text-grey-700 leading-snug">
                    {activeStudent.projectTopic}
                  </p>
                </div>

                {/* Project Description */}
                <div className="mb-4">
                  <p className="text-[16px] font-medium text-gray-600 mb-1">
                    Project Description
                  </p>
                  <p className=" text-[18px] text-justify font-[400] leading-snug max-h-40 overflow-y-auto text-grey-700">
                    {activeStudent.projectDescription}
                  </p>
                </div>

                {/* Last Submission */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex gap-1 items-center">
                    <div>
                      <Image
                          src="/icons/submission-history.png"
                          alt='Profile'
                          width={16}
                          height={16}
                      />
                    </div>
                    <span className="text-sm  text-grey-200">Last Submission:</span>
                  </div>
                  <span className="text-[14px] font-medium text-grey-700">
                    {activeStudent.lastSubmissionLabel}
                  </span>
                </div>
              </DialogContent>
            )}
          </Dialog>

        </div>
        
    </div>
  )
}

export default StudentCard