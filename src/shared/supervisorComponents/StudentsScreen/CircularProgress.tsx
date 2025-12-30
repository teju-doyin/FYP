// components/CircularProgress.tsx
import React from "react";

interface CircularProgressProps {
  size?: number;       // px
  strokeWidth?: number;
  value: number;       // 0–100
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 28,
  strokeWidth = 3,
  value,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, value));
  const offset = circumference * (1 - clamped / 100);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        {/* track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#B8BFCE"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1A3262"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      
    </div>
  );
};

export default CircularProgress;
