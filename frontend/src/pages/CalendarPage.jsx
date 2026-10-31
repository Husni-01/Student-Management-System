import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import AcademicCalendarWidget from '../components/AcademicCalendarWidget';

export default function CalendarPage() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  const currentMonthYear = today.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  // Calculate dynamic upcoming milestones relative to current academic timeline
  const currentYear = today.getFullYear();
  const currentMonthName = today.toLocaleDateString('en-US', { month: 'short' });

  const events = [
    {
      id: 1,
      title: 'Mid Sem Project Review Submission',
      date: `20 ${currentMonthName} ${currentYear}`,
      time: '11:59 PM',
      type: 'Deadline',
      location: 'Online Portal'
    },
    {
      id: 2,
      title: 'End Semester Theory Exams Begin',
      date: `25 ${currentMonthName} ${currentYear}`,
      time: '09:30 AM',
      type: 'Exams',
      location: 'Exam Center 1'
    },
    {
      id: 3,
      title: 'Final Year Major Project Submission',
      date: `30 ${currentMonthName} ${currentYear}`,
      time: '05:00 PM',
      type: 'Submission',
      location: 'CSE Dept Office'
    },
    {
      id: 4,
      title: 'Semester Break & Internship Commences',
      date: `10 Next Month`,
      time: 'All Day',
      type: 'Holiday',
      location: 'Campus-wide'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Academic Calendar & Events</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Semester {currentYear} University Timeline • Synced with Live Calendar
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1D61F2] bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-100 shadow-2xs">
          <CalendarIcon size={16} /> Month: {currentMonthYear}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Synced Calendar */}
        <div className="lg:col-span-5">
          <AcademicCalendarWidget
            selectedDate={selectedDate}
            onDateSelect={(date) => setSelectedDate(date)}
          />
        </div>

        {/* Right Column: Key Academic Milestones */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-base">Key Academic Milestones</h3>
            <span className="text-xs font-medium text-slate-500">
              Selected: <strong className="text-blue-600">{selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
            </span>
          </div>

          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-start justify-between hover:shadow-sm transition-all"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      evt.type === 'Deadline'
                        ? 'bg-amber-100 text-amber-800'
                        : evt.type === 'Exams'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {evt.type}
                  </span>
                  <span className="text-xs font-semibold text-[#1D61F2]">{evt.date}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm sm:text-base">{evt.title}</h4>
                <div className="flex items-center gap-4 mt-2.5 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-slate-400" /> {evt.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-slate-400" /> {evt.location}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-center gap-3 text-xs text-blue-700">
            <CheckCircle2 size={18} className="shrink-0 text-blue-600" />
            <span>
              Today's date (<strong>{today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong>) is automatically highlighted in the calendar. Click on any date to inspect university events.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
