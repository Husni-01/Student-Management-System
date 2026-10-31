import React from 'react';
import { ClipboardList, Calendar, MapPin, Download } from 'lucide-react';

export default function ExamsPage() {
  const exams = [
    {
      id: 1,
      course_code: 'CS301',
      course_name: 'Data Structures',
      exam_type: 'End Semester Theory',
      date: '25 May 2024',
      time: '09:30 AM - 12:30 PM',
      hall: 'Auditorium Hall B - Desk 42',
      status: 'Upcoming'
    },
    {
      id: 2,
      course_code: 'CS302',
      course_name: 'Database Management Systems',
      exam_type: 'End Semester Theory',
      date: '28 May 2024',
      time: '09:30 AM - 12:30 PM',
      hall: 'Tech Block 3 - Hall 201',
      status: 'Upcoming'
    },
    {
      id: 3,
      course_code: 'CS303',
      course_name: 'Operating Systems',
      exam_type: 'End Semester Practical',
      date: '02 June 2024',
      time: '02:00 PM - 05:00 PM',
      hall: 'Computer Lab 4',
      status: 'Scheduled'
    },
    {
      id: 4,
      course_code: 'CS304',
      course_name: 'Computer Networks',
      exam_type: 'End Semester Theory',
      date: '05 June 2024',
      time: '09:30 AM - 12:30 PM',
      hall: 'Main Block - Hall 102',
      status: 'Scheduled'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Examination Schedule</h2>
          <p className="text-xs text-slate-500 mt-0.5">End Semester Exam Datesheet & Hall Ticket Allocation</p>
        </div>
        <button
          onClick={() => alert('Downloading Hall Ticket PDF for Abhishek Verma...')}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1D61F2] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          <Download size={16} /> Download Hall Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 font-mono font-bold text-xs rounded-lg">
                  {exam.course_code}
                </span>
                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 font-semibold text-xs rounded-full">
                  {exam.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-800 text-base">{exam.course_name}</h3>
              <p className="text-xs text-purple-600 font-medium mt-0.5">{exam.exam_type}</p>

              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-slate-400" />
                  <span><strong>Date:</strong> {exam.date} ({exam.time})</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-slate-400" />
                  <span><strong>Venue:</strong> {exam.hall}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Carry Student ID card mandatory</span>
              <span className="font-semibold text-slate-700">Seating Confirmed</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

