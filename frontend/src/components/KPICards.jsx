import React from 'react';
import { FileText, GraduationCap, ClipboardList, Trophy, CalendarCheck } from 'lucide-react';

export default function KPICards({ kpis }) {
  const cards = [
    {
      id: 'cgpa',
      label: 'CGPA',
      value: kpis?.cgpa?.value || '8.45',
      subtitle: kpis?.cgpa?.subtitle || 'Current CGPA',
      icon: FileText,
      iconBg: 'bg-blue-100/70',
      iconColor: 'text-[#1D61F2]',
      subtitleColor: 'text-[#1D61F2]'
    },
    {
      id: 'courses',
      label: 'Courses Enrolled',
      value: kpis?.coursesEnrolled?.value ?? '6',
      subtitle: kpis?.coursesEnrolled?.subtitle || 'This Semester',
      icon: GraduationCap,
      iconBg: 'bg-emerald-100/70',
      iconColor: 'text-emerald-600',
      subtitleColor: 'text-emerald-600'
    },
    {
      id: 'exams',
      label: 'Exams Completed',
      value: kpis?.examsCompleted?.value ?? '4',
      subtitle: kpis?.examsCompleted?.subtitle || 'This Semester',
      icon: ClipboardList,
      iconBg: 'bg-purple-100/70',
      iconColor: 'text-purple-600',
      subtitleColor: 'text-purple-600'
    },
    {
      id: 'rank',
      label: 'Overall Rank',
      value: kpis?.overallRank?.value ?? '12',
      subtitle: kpis?.overallRank?.subtitle || 'out of 120',
      icon: Trophy,
      iconBg: 'bg-amber-100/70',
      iconColor: 'text-amber-500',
      subtitleColor: 'text-slate-400'
    },
    {
      id: 'attendance',
      label: 'Attendance',
      value: kpis?.attendance?.value || '87%',
      subtitle: kpis?.attendance?.subtitle || 'This Semester',
      icon: CalendarCheck,
      iconBg: 'bg-rose-100/70',
      iconColor: 'text-rose-500',
      subtitleColor: 'text-rose-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 shadow-xs hover:shadow-sm transition-all duration-200 flex items-center gap-4"
          >
            {/* Square Icon Container */}
            <div className={`w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor}`}>
              <Icon size={26} strokeWidth={2.2} />
            </div>

            {/* Content Column */}
            <div className="min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block truncate">
                {card.label}
              </span>
              <div className="text-2xl font-extrabold text-slate-800 tracking-tight leading-tight mt-0.5">
                {card.value}
              </div>
              <span className={`text-xs font-medium block mt-0.5 truncate ${card.subtitleColor}`}>
                {card.subtitle}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

