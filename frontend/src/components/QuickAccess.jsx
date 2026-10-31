import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, BookOpen, Clock, User, Download, MessageSquare } from 'lucide-react';

export default function QuickAccess() {
  const navigate = useNavigate();

  const items = [
    {
      label: 'My Results',
      path: '/results',
      icon: FileText,
      iconColor: 'text-[#1D61F2]',
      borderHover: 'hover:border-blue-300 hover:bg-blue-50/30'
    },
    {
      label: 'My Courses',
      path: '/courses',
      icon: BookOpen,
      iconColor: 'text-emerald-600',
      borderHover: 'hover:border-emerald-300 hover:bg-emerald-50/30'
    },
    {
      label: 'Timetable',
      path: '/timetable',
      icon: Clock,
      iconColor: 'text-purple-600',
      borderHover: 'hover:border-purple-300 hover:bg-purple-50/30'
    },
    {
      label: 'Attendance',
      path: '/attendance',
      icon: User,
      iconColor: 'text-amber-500',
      borderHover: 'hover:border-amber-300 hover:bg-amber-50/30'
    },
    {
      label: 'Downloads',
      path: '/downloads',
      icon: Download,
      iconColor: 'text-sky-500',
      borderHover: 'hover:border-sky-300 hover:bg-sky-50/30'
    },
    {
      label: 'Feedback',
      path: '/feedback',
      icon: MessageSquare,
      iconColor: 'text-rose-500',
      borderHover: 'hover:border-rose-300 hover:bg-rose-50/30'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="mb-3">
        <h3 className="font-bold text-slate-800 text-base sm:text-lg">Quick Access</h3>
      </div>

      {/* 2x3 Grid */}
      <div className="grid grid-cols-3 gap-3 my-auto">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-150 transition-all duration-200 cursor-pointer ${item.borderHover}`}
            >
              <div className="mb-1.5 flex items-center justify-center">
                <Icon size={24} className={item.iconColor} strokeWidth={2.2} />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-700 text-center">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

