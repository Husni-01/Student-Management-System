import React from 'react';
import { Megaphone, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NoticeBoard({ notices = [], onAddNotice }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 text-base sm:text-lg">Notice Board</h3>
        <div className="flex items-center gap-3">
          {onAddNotice && (
            <button
              onClick={onAddNotice}
              className="text-xs bg-blue-50 text-[#1D61F2] hover:bg-blue-100 px-2 py-1 rounded-lg font-medium transition-colors flex items-center gap-1"
            >
              <Plus size={13} /> Add
            </button>
          )}
          <button
            onClick={() => navigate('/notices')}
            className="text-xs font-semibold text-[#1D61F2] hover:underline cursor-pointer"
          >
            View All Notices
          </button>
        </div>
      </div>

      {/* Notice List */}
      <div className="space-y-4">
        {notices && notices.length > 0 ? (
          notices.slice(0, 3).map((notice) => (
            <div key={notice.id} className="flex items-start gap-3.5 group">
              {/* Megaphone Icon */}
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#1D61F2] group-hover:scale-105 transition-transform">
                <Megaphone size={18} />
              </div>

              {/* Text Information */}
              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug group-hover:text-[#1D61F2] transition-colors">
                  {notice.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 line-clamp-2">
                  {notice.description}
                </p>
                <span className="text-[11px] font-semibold text-[#1D61F2] block mt-1">
                  {notice.formattedDate || notice.publish_date}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-slate-400 text-xs">
            No notices posted yet.
          </div>
        )}
      </div>
    </div>
  );
}

