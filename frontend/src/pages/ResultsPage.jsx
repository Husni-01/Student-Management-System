import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Search, Plus, Edit2, Trash2, RefreshCw } from 'lucide-react';
import ResultModal from '../components/ResultModal';

export default function ResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResult, setEditingResult] = useState(null);

  const fetchResults = () => {
    setLoading(true);
    api.getResults()
      .then((res) => {
        if (res.success) setResults(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleSaveResult = async (formData) => {
    if (editingResult) {
      await api.updateResult(editingResult.id, formData);
    } else {
      await api.createResult(formData);
    }
    fetchResults();
  };

  const handleDeleteResult = async (id) => {
    if (window.confirm('Are you sure you want to delete this result permanently?')) {
      await api.deleteResult(id);
      fetchResults();
    }
  };

  // Grade color helper
  const getGradeBadge = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'B+':
      case 'B':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'C':
        return 'bg-amber-100 text-amber-700 border border-amber-200';
      default:
        return 'bg-rose-100 text-rose-700 border border-rose-200';
    }
  };

  // Filtered results
  const filtered = results.filter((r) => {
    const matchSearch = r.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = selectedFilter === 'All' || r.exam_type === selectedFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Academic Examination Results</h2>
          <p className="text-xs text-slate-500 mt-0.5">Comprehensive grade sheet, marks, and evaluation records</p>
        </div>
        <button
          onClick={() => {
            setEditingResult(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1D61F2] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          <Plus size={16} /> Enter New Marks
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by subject name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Mid Sem', 'End Sem', 'Quiz'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === tab
                  ? 'bg-[#1D61F2] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Results Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="flex justify-center p-12">
            <RefreshCw size={28} className="animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold text-xs">
                <tr>
                  <th className="py-3.5 px-5">Subject</th>
                  <th className="py-3.5 px-5">Exam Type</th>
                  <th className="py-3.5 px-5 text-center">Grade</th>
                  <th className="py-3.5 px-5">Score</th>
                  <th className="py-3.5 px-5">Percentage</th>
                  <th className="py-3.5 px-5">Date</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length > 0 ? (
                  filtered.map((item) => {
                    const pct = Math.round((item.score / (item.max_score || 100)) * 100);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
                        <td className="py-3.5 px-5 font-bold text-slate-800">
                          {item.subject}
                        </td>
                        <td className="py-3.5 px-5 text-slate-500">
                          {item.exam_type}
                        </td>
                        <td className="py-3.5 px-5 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${getGradeBadge(item.grade)}`}>
                            {item.grade}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 font-bold text-slate-700">
                          {item.score} / {item.max_score || 100}
                        </td>
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-blue-500' : 'bg-amber-500'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-slate-600">{pct}%</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-5 text-slate-500 whitespace-nowrap">
                          {item.formattedDate || item.exam_date}
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingResult(item);
                                setIsModalOpen(true);
                              }}
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Record"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteResult(item.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="py-10 text-center text-slate-400 text-xs">
                      No matching exam records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ResultModal
        isOpen={isModalOpen}
        initialData={editingResult}
        onClose={() => {
          setIsModalOpen(false);
          setEditingResult(null);
        }}
        onSubmit={handleSaveResult}
      />
    </div>
  );
}

