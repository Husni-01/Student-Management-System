import React from 'react';
import { Download, FileText, CheckCircle2 } from 'lucide-react';

export default function DownloadsPage() {
  const files = [
    { name: 'Semester 5 Official Grade Sheet / Transcript (PDF)', size: '1.2 MB', category: 'Academic Report', date: '12 May 2024' },
    { name: 'End Semester Hall Ticket & Seating Plan', size: '540 KB', category: 'Exam Admit Card', date: '15 May 2024' },
    { name: 'B.Tech CSE Semester 5 Complete Syllabus Curriculum', size: '3.4 MB', category: 'Curriculum', date: '01 Jan 2024' },
    { name: 'Database Management Systems Lab Manual & Practice Tasks', size: '2.1 MB', category: 'Lab Manual', date: '15 Feb 2024' },
    { name: 'Operating Systems Previous 5 Years Solved Question Bank', size: '4.8 MB', category: 'Study Material', date: '10 Apr 2024' }
  ];

  const handleDownload = (fileName) => {
    // Generate mock text download
    const blob = new Blob([`Student Result Management System (SRMS)\nDocument: ${fileName}\nStudent: Abhishek Verma (21BCSE104)\nGenerated: ${new Date().toLocaleString()}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.replace(/\s+/g, '_') + '.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Student Document Repository</h2>
          <p className="text-xs text-slate-500 mt-0.5">Download verified transcripts, syllabi, and official university papers</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 font-semibold">
          <CheckCircle2 size={16} /> All Documents Digitally Signed
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {files.map((file, idx) => (
          <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1D61F2] flex items-center justify-center shrink-0">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm leading-snug">{file.name}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>{file.category}</span>
                  <span>•</span>
                  <span>{file.size}</span>
                  <span>•</span>
                  <span>Updated {file.date}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownload(file.name)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-[#1D61F2] hover:text-white text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0 self-end sm:self-auto"
            >
              <Download size={14} /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

