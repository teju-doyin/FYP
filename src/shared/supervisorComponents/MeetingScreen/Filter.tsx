'use client'
import React, { useState } from "react";

function Filter() {
  const [activeTag, setActiveTag] = useState<"upcoming" | "history">("upcoming");

  const isUpcomingActive = activeTag === "upcoming";
  const isHistoryActive = activeTag === "history";

  return (
    <div className="flex-between items-center gap-4 mb-6 mx-10">
      {/* Upcoming */}
      <button
        type="button"
        onClick={() => setActiveTag("upcoming")}
        className="flex-between items-center"
      >
        <div className="flex gap-2 items-center">
          <span
            className={
              isUpcomingActive
                ? "text-blue-500 text-[16px] font-medium"
                : "text-grey-300 text-[14px] font-light"
            }
          >
            Upcoming
          </span>
          <span
            className={
              "py-0.5 px-2 rounded-full " +
              (isUpcomingActive
                ? "text-white bg-blue-500 text-[14px] font-medium"
                : "text-blue-200 bg-blue-50 text-[12px]")
            }
          >
            4
          </span>
        </div>
      </button>
            <div className="line-vertical bg-[#BCBDBE]/60 h-[18px] ml-2"></div>
      {/* History */}
      <button
        type="button"
        onClick={() => setActiveTag("history")}
        className=" items-center"
      >
        <div className="flex gap-2 items-center">
          <span
            className={ 
              isHistoryActive
                ? "text-blue-500 text-[16px] font-medium"
                : "text-grey-300 text-[14px] font-light"
            }
          >
            History
          </span>
          <span
            className={
              "py-0.5 px-2 rounded-full " +
              (isHistoryActive
                ? "text-white bg-blue-500 text-[14px] font-medium"
                : "text-blue-200 bg-blue-50 text-[12px]")
            }
          >
            3
          </span>
        </div>
      </button>
    </div>
  );
}

export default Filter;
