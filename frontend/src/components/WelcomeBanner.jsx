import React from 'react';

export default function WelcomeBanner({ studentName = 'Abhishek Verma!' }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50/90 via-sky-50/70 to-indigo-50/60 border border-blue-100/80 p-6 sm:p-7 shadow-xs">
      {/* Background Soft Glow Circles */}
      <div className="absolute right-36 -top-10 w-44 h-44 bg-blue-200/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute right-6 -bottom-10 w-52 h-52 bg-indigo-200/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">Good Morning,</span>
            <span className="text-lg animate-bounce">👋</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E40AF] tracking-tight mt-1">
            {studentName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
            Stay updated with your academic journey.
          </p>
        </div>

        {/* Right Illustration: Books & Plant Graphic matching blueprint */}
        <div className="hidden sm:flex items-end justify-center self-end sm:self-center pr-4">
          <svg
            className="w-48 h-28 lg:w-56 lg:h-32 drop-shadow-sm"
            viewBox="0 0 240 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Birds */}
            <path
              d="M190 28 C194 24, 198 26, 202 28 C206 26, 210 24, 214 28"
              stroke="#64748B"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M210 40 C213 37, 216 38, 219 40 C222 38, 225 37, 228 40"
              stroke="#94A3B8"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Cloud */}
            <path
              d="M130 35 C130 30, 135 25, 142 25 C145 20, 155 20, 160 25 C168 25, 172 30, 170 36 Z"
              fill="#E0E7FF"
              opacity="0.6"
            />

            {/* Plant Pot */}
            <ellipse cx="65" cy="115" rx="14" ry="4" fill="#CBD5E1" />
            <path
              d="M55 90 L59 115 C59 117, 71 117, 71 115 L75 90 Z"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            {/* Plant Leaves */}
            <path
              d="M65 90 Q62 60 55 52 Q62 68 64 90"
              fill="#22C55E"
            />
            <path
              d="M65 90 Q65 42 66 38 Q67 55 66 90"
              fill="#16A34A"
            />
            <path
              d="M65 90 Q72 58 77 50 Q71 67 66 90"
              fill="#4ADE80"
            />

            {/* Stack of Books */}
            {/* Bottom Book (Deep Blue) */}
            <g transform="translate(85, 92)">
              <rect x="0" y="0" width="125" height="24" rx="4" fill="#1D4ED8" />
              {/* Pages side */}
              <rect x="18" y="4" width="103" height="16" rx="2" fill="#FFFFFF" />
              {/* Spine */}
              <rect x="0" y="0" width="18" height="24" rx="3" fill="#1E40AF" />
              <line x1="18" y1="2" x2="18" y2="22" stroke="#1D4ED8" strokeWidth="1.5" />
            </g>

            {/* Middle Book (Yellow/Amber) */}
            <g transform="translate(92, 70)">
              <rect x="0" y="0" width="112" height="22" rx="4" fill="#F59E0B" />
              {/* Pages side */}
              <rect x="16" y="4" width="92" height="14" rx="2" fill="#FFFBEB" />
              {/* Spine */}
              <rect x="0" y="0" width="16" height="22" rx="3" fill="#D97706" />
              <line x1="16" y1="2" x2="16" y2="20" stroke="#F59E0B" strokeWidth="1.5" />
            </g>

            {/* Top Book (Vibrant Blue) */}
            <g transform="translate(100, 48)">
              <rect x="0" y="0" width="100" height="22" rx="4" fill="#2563EB" />
              {/* Pages side */}
              <rect x="15" y="4" width="81" height="14" rx="2" fill="#FFFFFF" />
              {/* Spine */}
              <rect x="0" y="0" width="15" height="22" rx="3" fill="#1D4ED8" />
              <line x1="15" y1="2" x2="15" y2="20" stroke="#2563EB" strokeWidth="1.5" />
              {/* Bookmark */}
              <path d="M72 4 L72 14 L75 11 L78 14 L78 4 Z" fill="#EF4444" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

