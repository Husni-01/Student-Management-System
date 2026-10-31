import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PerformanceOverviewChart({ performance }) {
  const navigate = useNavigate();

  const overall = performance?.overallPercentage ?? 84;
  const breakdown = performance?.breakdown || {
    excellent: 60,
    good: 20,
    average: 12,
    needsImprovement: 8
  };

  // SVG Donut Calculations
  const size = 160;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2; // (160 - 18)/2 = 71
  const circumference = 2 * Math.PI * radius; // ~446.1

  const pExc = breakdown.excellent || 60;
  const pGood = breakdown.good || 20;
  const pAvg = breakdown.average || 12;
  const pNeed = breakdown.needsImprovement || 8;

  const lenExc = (pExc / 100) * circumference;
  const lenGood = (pGood / 100) * circumference;
  const lenAvg = (pAvg / 100) * circumference;
  const lenNeed = (pNeed / 100) * circumference;

  const offsetExc = 0;
  const offsetGood = -lenExc;
  const offsetAvg = -(lenExc + lenGood);
  const offsetNeed = -(lenExc + lenGood + lenAvg);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-800 text-base sm:text-lg">Performance Overview</h3>
        <button
          onClick={() => navigate('/results')}
          className="text-xs font-semibold text-[#1D61F2] hover:underline cursor-pointer"
        >
          View Details
        </button>
      </div>

      {/* Chart and Legend Area */}
      <div className="flex flex-col sm:flex-row items-center justify-around gap-4 my-auto">
        {/* Donut Chart */}
        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="transform -rotate-90"
          >
            {/* Background track circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Excellent Segment (Emerald) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#10B981"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={`${lenExc} ${circumference}`}
              strokeDashoffset={offsetExc}
              strokeLinecap="round"
            />
            {/* Good Segment (Blue) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#2563EB"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={`${lenGood} ${circumference}`}
              strokeDashoffset={offsetGood}
              strokeLinecap="round"
            />
            {/* Average Segment (Amber) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#F59E0B"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={`${lenAvg} ${circumference}`}
              strokeDashoffset={offsetAvg}
              strokeLinecap="round"
            />
            {/* Needs Improvement Segment (Rose) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#EF4444"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={`${lenNeed} ${circumference}`}
              strokeDashoffset={offsetNeed}
              strokeLinecap="round"
            />
          </svg>

          {/* Center Text inside Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-xl sm:text-2xl font-black text-slate-800 leading-tight">
              {overall}%
            </span>
            <span className="text-[10px] text-slate-400 font-medium leading-tight">
              Overall<br />Performance
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2 text-xs w-full sm:w-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-medium text-slate-700">Excellent</span>
            </div>
            <span className="font-bold text-slate-800">{pExc}%</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
              <span className="font-medium text-slate-700">Good</span>
            </div>
            <span className="font-bold text-slate-800">{pGood}%</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
              <span className="font-medium text-slate-700">Average</span>
            </div>
            <span className="font-bold text-slate-800">{pAvg}%</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
              <span className="font-medium text-slate-700">Needs Improvement</span>
            </div>
            <span className="font-bold text-slate-800">{pNeed}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

