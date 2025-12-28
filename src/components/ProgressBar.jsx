// components/ProgressBar.jsx
import React from "react";

export default function ProgressBar({ progress }) {
  return (
    <div className="w-full h-2 sm:h-3 bg-slate-200 rounded-full">
      <div
        className="h-2 sm:h-3 bg-blue-500 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
