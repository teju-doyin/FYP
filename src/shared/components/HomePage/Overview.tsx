// app/(wherever)/Overview.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChapterMeta } from "@/types/ChapterData";

interface Props {
  chapter?: ChapterMeta | null;
}

function Overview({ chapter }: Props) {
    if (!chapter) {
    // simple skeleton / fallback while data loads
    return (
      <div className="card shadow mb-8">
        <div className="h-6 bg-slate-100 rounded mb-4 w-1/2" />
        <div className="h-24 bg-slate-100 rounded" />
      </div>
    );
  }
  const circleRadius = 60;
  const circumference = 2 * Math.PI * circleRadius;

  const completedCount = chapter.milestones.filter((m) => m.status === 2).length;
  const progress =
    chapter.milestones.length === 0
      ? 0
      : (completedCount / chapter.milestones.length) * 100;

  const progressStatus = circumference - (progress / 100) * circumference;

  const inProgressCount = chapter.milestones.filter((m) => m.status === 1).length;
  const notStartedCount = chapter.milestones.filter((m) => m.status === 0).length;

  const formattedDate = new Date(chapter.dueDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="card shadow mb-8">
      <div className="flex-between mb-2">
        <h3 className="text-blue-800 font-light text-xl ">{chapter.title}</h3>
        <Image src="/icons/more-info.png" alt="More info" width={20} height={20} />
      </div>

      <div className="font-medium flex items-center gap-2 ">
        <Image src="/icons/timer.png" alt="Timer" width={20} height={20} />
        <div>
          <span className="text-grey-300 text-[13px] font-normal">Due Date: </span>
          <span className="text-grey-500 text-[15px] font-medium">
            {formattedDate}
          </span>
        </div>
      </div>

      <div className="line" />

      <div className="flex-between">
        {/* Progress circle */}
        <div className="progress">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 150 150">
              <circle
                cx="75"
                cy="75"
                r={circleRadius}
                stroke="#B8BFCE"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="75"
                cy="75"
                r={circleRadius}
                stroke="#1A3262"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={progressStatus}
                className="transition-all duration-700 ease-in-out"
              />
            </svg>
            <div className="absolute inset-0 flex justify-center items-center ">
              <div className="font-nunito text-blue-500">
                <p className="text-xl text-center font-bold">
                  {Math.round(progress)}%
                </p>
                <p className="text-[14px]">Complete</p>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone status counts */}
        <div className="milestones shadow bg-[#FAFAFA] w-[55%] p-2 rounded-[5px]">
          <div className="flex-between mb-2">
            <h4 className="text-[#4B4C54] text-[14px]">Milestones</h4>
            <Link href="/milestone">
              <span className="underline text-blue-200 text-[14px]">Manage</span>
            </Link>
          </div>
          <div className="status section flex-between">
            <div className="status shadow p-2 bg-white border-[#4B4C54] rounded-[5px]">
              <span className="text-[#02030E] font-semibold text-[20px] ml-1">
                {inProgressCount}
              </span>
              <div className="flex gap-1 items-center">
                <span className="dot bg-orange" />
                <p className="text-orange text-[12px]">In Progress</p>
              </div>
            </div>
            <div className="status shadow p-2 bg-white border-[#4B4C54] rounded-[5px]">
              <span className="text-[#02030E] font-semibold text-[20px] ml-1">
                {notStartedCount}
              </span>
              <div className="flex gap-1 items-center">
                <span className="dot bg-grey-300 " />
                <p className="text-grey-300 text-[12px]">Not started</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
