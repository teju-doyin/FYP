import React from "react";

type StatusBreakdown = {
  awaiting: number;
  underReview: number;
  completed: number;
};

const progressData: StatusBreakdown = {
  awaiting: 2,
  underReview: 4,
  completed: 4,
};

const SupervisorOverview = () => {
  const { awaiting, underReview, completed } = progressData;
  const total = awaiting + underReview + completed || 1;

  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const completedLen = (completed / total) * circumference;
  const underReviewLen = (underReview / total) * circumference;
  const awaitingLen = (awaiting / total) * circumference;

  return (
    <div className="card shadow mb-10 p-4 ">
        <p className="text-[12px] font-medium text-grey-300 mb-4">
          Progress Overview
        </p>
      {/* Left: multi-segment donut */}
      <div className="flex items-center gap-4">
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
              {/* track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#E5E7EB"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* completed (green) */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#0B9F1E"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${completedLen} ${circumference}`}
                strokeDashoffset={0}
              />
              {/* under review (orange) */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#ff7c10"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${underReviewLen} ${circumference}`}
                strokeDashoffset={-completedLen}
              />
              {/* awaiting (gray) */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#9CA3AF"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${awaitingLen} ${circumference}`}
                strokeDashoffset={-(completedLen + underReviewLen)}
              />
            </svg>
            {/* center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xl font-semibold text-gray-800">{total}</p>
              <p className="text-xs text-gray-500">Submissions</p>
            </div>
          </div>
          {/* Right: title + legend */}
          <div className="flex-1">
          
            <div className="bg-white rounded-xl px-4 py-3 shadow-sm">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-grey-300" />
                    <span className="text-grey-500">Awaiting Review</span>
                  </div>
                  <span className="text-grey-300 text-[18px] font-medium ">{awaiting}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange" />
                    <span className="text-grey-500">Under Review</span>
                  </div>
                  <span className="text-grey-300 text-[18px] font-medium ">{underReview}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green" />
                    <span className="text-grey-500">Review Completed</span>
                  </div>
                  <span className="text-grey-300 text-[18px] font-medium ">{completed}</span>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default SupervisorOverview;
