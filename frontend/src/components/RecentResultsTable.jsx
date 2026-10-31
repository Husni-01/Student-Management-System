import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function RecentResultsTable({ results = [], onAddResult, onEditResult, onDeleteResult }) {
  const navigate = useNavigate();

  // Helper for grade pill styling
  const getGradeBadge = (grade) => {
    switch (grade) {
      case 'A+':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200/60';
      case 'A':
        return 'bg-emerald-100/90 text-emerald-700 border border-emerald-200/50';
      case 'B+':
        return 'bg-blue-100 text-blue-700 border border-blue-200/60';
      case 'B':
        return 'bg-blue-50 text-blue-600 border border-blue-200/40';
      case 'C':
        return 'bg-amber-100 text-amber-700 border border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 text-base sm:text-lg">Recent Results</h3>
        <div className="flex items-center gap-3">
          {onAddResult && (
            <button
              onClick={onAddResult}
              className="text-xs bg-blue-50 text-[#1D61F2] hover:bg-blue-100 px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1"
            >
              <Plus size={14} /> Add Result
            </button>
          )}
          <button
            onClick={() => navigate('/results')}
            className="text-xs font-semibold text-[#1D61F2] hover:underline cursor-pointer"
          >
            View All Results
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[11px] sm:text-xs">
              <th className="pb-3 font-medium">Subject</th>
              <th className="pb-3 font-medium">Exam Type</th>
              <th className="pb-3 font-medium text-center">Grade</th>
              <th className="pb-3 font-medium">Score</th>
              <th className="pb-3 font-medium">Date</th>
              {(onEditResult || onDeleteResult) && <th className="pb-3 font-medium text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {results && results.length > 0 ? (
              results.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70 transition-colors group">
                  <td className="py-3.5 pr-2 font-medium text-slate-800 text-xs sm:text-sm">
                    {row.subject}
                  </td>
                  <td className="py-3.5 pr-2 text-slate-500 text-xs">
                    {row.exam_type || 'Mid Sem'}
                  </td>
                  <td className="py-3.5 px-2 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${getGradeBadge(row.grade)}`}>
                      {row.grade}
                    </span>
                  </td>
                  <td className="py-3.5 pr-2 text-slate-700 font-semibold text-xs sm:text-sm">
                    {row.score}/{row.max_score || 100}
                  </td>
                  <td className="py-3.5 pr-2 text-slate-500 text-xs whitespace-nowrap">
                    {row.formattedDate || row.exam_date}
                  </td>
                  {(onEditResult || onDeleteResult) && (
                    <td className="py-3.5 pl-2 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        {onEditResult && (
                          <button
                            onClick={() => onEditResult(row)}
                            className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                            title="Edit Record"
                          >
                            <Edit2 size={13} />
                          </button>
                        )}
                        {onDeleteResult && (
                          <button
                            onClick={() => onDeleteResult(row.id)}
                            className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50"
                            title="Delete Record"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400 text-xs">
                  No examination results available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

