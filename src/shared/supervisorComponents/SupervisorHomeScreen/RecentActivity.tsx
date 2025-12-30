import React from 'react'
import Image from "next/image";

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
    lastSubmissionLabel: "Chapter 4 - Implementation",
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
const RecentActivity = () => {
  return (
    <div>
        <h3 className='text-grey-500 text-[18px] font-medium mb-4'>Recent Activity</h3>
        <div className='flex gap-4 overflow-x-auto'>
            {students.map((student)=>(
                <div className="card shadow border flex-none w-56 md:w-64"
                    key={student.id}>
                    <div className="flex items-center gap-3 mb-4">
                        <div>
                            <Image
                                src={student.avatarUrl}
                                alt={student.name}
                                width={30}
                                height={30}
                            />
                        </div>
                        <p className='font-light text-blue-500'>{student.name}</p>
                    </div>
                    <div className="space-y-2 mb-3">
                        <p className='font-light text-grey-300'>{student.lastSubmissionLabel}</p>
                        <p className='text-grey-500 font-semibold'>{student.projectTopic}</p>
                    </div>
                    <div className='flex justify-end'>
                        <p className='underline text-blue-500 text-[14px]'>Continue review</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default RecentActivity