import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AcademicCalendarWidget({ onDateSelect, selectedDate }) {
  const navigate = useNavigate();
  const today = new Date();

  // State for currently displayed year and month
  const [viewDate, setViewDate] = useState(new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Month navigation handlers
  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setViewDate(new Date());
  };

  // Days of week (Monday to Sunday as in blueprint)
  const daysOfWeek = [
    { label: 'Mon', isWeekend: false },
    { label: 'Tue', isWeekend: false },
    { label: 'Wed', isWeekend: false },
    { label: 'Thu', isWeekend: false },
    { label: 'Fri', isWeekend: false },
    { label: 'Sat', isWeekend: true },
    { label: 'Sun', isWeekend: true },
  ];

  // Calendar matrix calculation
  // First day of current month:
  const firstDayOfMonth = new Date(year, month, 1);
  // getDay(): Sunday = 0, Monday = 1, ..., Saturday = 6
  // Convert so Monday = 0, Sunday = 6
  const startDayIndex = (firstDayOfMonth.getDay() + 6) % 7;

  // Number of days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Number of days in previous month
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays = [];

  // 1. Previous month trailing days
  for (let i = startDayIndex - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    const dateObj = new Date(year, month - 1, dayNum);
    calendarDays.push({
      num: dayNum,
      currentMonth: false,
      date: dateObj,
      isWeekend: dateObj.getDay() === 0 || dateObj.getDay() === 6
    });
  }

  // 2. Current month days
  for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
    const dateObj = new Date(year, month, dayNum);
    const isToday =
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear();

    const isSelected = selectedDate
      ? dateObj.toDateString() === selectedDate.toDateString()
      : isToday;

    calendarDays.push({
      num: dayNum,
      currentMonth: true,
      date: dateObj,
      isToday,
      isSelected,
      isWeekend: dateObj.getDay() === 0 || dateObj.getDay() === 6
    });
  }

  // 3. Next month leading days to complete the grid (multiple of 7: 35 or 42)
  const totalCells = calendarDays.length > 35 ? 42 : 35;
  const remainingCells = totalCells - calendarDays.length;

  for (let dayNum = 1; dayNum <= remainingCells; dayNum++) {
    const dateObj = new Date(year, month + 1, dayNum);
    calendarDays.push({
      num: dayNum,
      currentMonth: false,
      date: dateObj,
      isWeekend: dateObj.getDay() === 0 || dateObj.getDay() === 6
    });
  }

  const monthName = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-800 text-base sm:text-lg">Academic Calendar</h3>
        <button
          onClick={() => navigate('/calendar')}
          className="text-xs font-semibold text-[#1D61F2] hover:underline cursor-pointer"
        >
          View Calendar
        </button>
      </div>

      {/* Month Navigation & Label */}
      <div className="flex items-center justify-between px-1 mb-2">
        <button
          onClick={handlePrevMonth}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Previous Month"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-2">
          <span className="font-bold text-xs sm:text-sm text-slate-800">
            {monthName}
          </span>
          {(year !== today.getFullYear() || month !== today.getMonth()) && (
            <button
              onClick={handleToday}
              className="text-[10px] font-semibold text-[#1D61F2] bg-blue-50 px-2 py-0.5 rounded-full hover:bg-blue-100 transition-colors"
            >
              Today
            </button>
          )}
        </div>

        <button
          onClick={handleNextMonth}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Next Month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 text-center mb-1">
        {daysOfWeek.map((d) => (
          <span
            key={d.label}
            className={`text-[11px] font-semibold ${
              d.isWeekend ? 'text-rose-500' : 'text-slate-500'
            }`}
          >
            {d.label}
          </span>
        ))}
      </div>

      {/* Dynamic Dates Grid */}
      <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
        {calendarDays.map((item, idx) => {
          let cellStyle =
            'w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center mx-auto text-xs font-medium rounded-lg transition-colors cursor-pointer select-none';

          if (item.isSelected || item.isToday) {
            cellStyle += ' bg-[#1D61F2] text-white font-bold shadow-xs';
          } else if (!item.currentMonth) {
            cellStyle += ' text-slate-300';
          } else if (item.isWeekend) {
            cellStyle += ' text-rose-500 hover:bg-rose-50';
          } else {
            cellStyle += ' text-slate-700 hover:bg-slate-100';
          }

          return (
            <div
              key={idx}
              className="flex justify-center py-0.5"
              onClick={() => onDateSelect && onDateSelect(item.date)}
            >
              <span className={cellStyle}>{item.num}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
