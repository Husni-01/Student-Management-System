import React from 'react';
import { Clock } from 'lucide-react';

export default function TimetablePage() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const slots = [
    { time: '09:00 - 10:00 AM', mon: 'CS301: Data Structures', tue: 'CS302: DBMS', wed: 'CS301: Data Structures', thu: 'CS303: OS', fri: 'CS304: Networks' },
    { time: '10:00 - 11:00 AM', mon: 'CS302: DBMS', tue: 'CS304: Networks', wed: 'CS302: DBMS', thu: 'CS305: SE', fri: 'CS301: Data Structures' },
    { time: '11:15 - 12:15 PM', mon: 'CS303: Operating Systems', tue: 'CS301: Data Structures', wed: 'CS304: Networks', thu: 'CS302: DBMS', fri: 'CS305: SE' },
    { time: '01:00 - 02:00 PM', mon: 'Lunch Break', tue: 'Lunch Break', wed: 'Lunch Break', thu: 'Lunch Break', fri: 'Lunch Break' },
    { time: '02:00 - 04:00 PM', mon: 'DS Lab (Lab 2)', tue: 'DBMS Lab (Lab 4)', wed: 'OS Lab (Lab 1)', thu: 'Library / Project', fri: 'Mentorship / Sports' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Weekly Class Timetable</h2>
          <p className="text-xs text-slate-500 mt-0.5">Semester 5 • Computer Science & Engineering Section A</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100">
          <Clock size={16} /> Room: Tech Tower 304
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 font-bold text-xs border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-4 font-bold">Time Slot</th>
                {days.map((d) => (
                  <th key={d} className="py-3.5 px-4 font-bold">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {slots.map((s, idx) => (
                <tr key={idx} className={s.mon === 'Lunch Break' ? 'bg-amber-50/40' : 'hover:bg-slate-50/70'}>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700 whitespace-nowrap bg-slate-50/30">
                    {s.time}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{s.mon}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{s.tue}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{s.wed}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{s.thu}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{s.fri}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

