"use client";

import React from "react";

const Loading = ({
  message = "Loading...",
}: {
  message?: string;
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Spinner */}
      <div
        className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"
        aria-label="Loading"
      />
      <p className="text-sm text-gray-600 text-center px-4">
        {message}
      </p>
    </div>
  );
};

export default Loading;
