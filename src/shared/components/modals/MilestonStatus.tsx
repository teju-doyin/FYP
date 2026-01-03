// StatusModal.tsx
"use client";

import React from "react";
import Image from "next/image";
import { MilestoneStatus } from "@/types/ChapterData";

interface StatusModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  currentStatus: MilestoneStatus;
  onChangeStatus: (status: MilestoneStatus) => void;
}

const StatusModal: React.FC<StatusModalProps> = ({
  open,
  onClose,
  title,
  currentStatus,
  onChangeStatus,
}) => {
  if (!open) return null;

  const options: { label: string; value: MilestoneStatus; pillBg: string; dotColor: string; textColor: string }[] = [
    {
      label: "Complete",
      value: 2,
      pillBg: "bg-[#E8FBF3]",
      dotColor: "bg-[#2EB872]",
      textColor: "text-[#2EB872]",
    },
    {
      label: "In progress",
      value: 1,
      pillBg: "bg-[#FFEFE1]",
      dotColor: "bg-[#F28B30]",
      textColor: "text-[#F28B30]",
    },
    {
      label: "Not started",
      value: 0,
      pillBg: "bg-[#F4F4F6]",
      dotColor: "bg-[#5F6273]",
      textColor: "text-[#5F6273]",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg w-[320px] p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <p className="text-[13px] text-grey-400">Change the tag on</p>
              <p className="text-[14px] font-semibold text-grey-700">
                “{title}”
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-grey-400 hover:text-grey-600"
          >
            <Image
              src="/icons/close.png"
              alt="Close"
              width={16}
              height={16}
            />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-2 mb-4">
          {options.map((opt) => {
            const isActive = currentStatus === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChangeStatus(opt.value)}
                className="w-full flex items-center gap-3"
              >
                {/* left circle (radio) */}
                <span
                  className={`flex items-center justify-center w-5 h-5 rounded-full border
                    ${
                      isActive
                        ? "border-transparent bg-[#314066]"
                        : "border-[#D5D7E0] bg-white"
                    }`}
                >
                  {isActive && (
                    <span className="w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                </span>

                {/* colored pill */}
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-medium ${opt.pillBg} ${opt.textColor}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${opt.dotColor}`}
                  />
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Done button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-sm rounded-md bg-[#152349] text-white hover:bg-[#101a3a]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
