import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Megaphone, Plus, Trash2, Search, RefreshCw } from 'lucide-react';
import NoticeModal from '../components/NoticeModal';

export default function NoticeBoardPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const fetchNotices = () => {
    setLoading(true);
    api.getNotices()
      .then((res) => {
        if (res.success) setNotices(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleCreateNotice = async (formData) => {
    await api.createNotice(formData);
    fetchNotices();
  };

  const handleDeleteNotice = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      await api.deleteNotice(id);
      fetchNotices();
    }
  };

  const filtered = notices.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Campus Notice Board</h2>
          <p className="text-xs text-slate-500 mt-0.5">Official circulars, exam notifications, and university circulars</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1D61F2] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          <Plus size={16} /> Post New Circular
        </button>
      </div>

      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Filter announcements by title or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 shadow-xs"
        />
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <RefreshCw size={28} className="animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1D61F2] flex items-center justify-center">
                      <Megaphone size={16} />
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {notice.category || 'Academic'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteNotice(notice.id)}
                    className="p-1 text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove Notice"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <h3 className="font-bold text-slate-800 text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                  {notice.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {notice.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1D61F2]">
                <span>Official Circular</span>
                <span>{notice.formattedDate || notice.publish_date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <NoticeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateNotice}
      />
    </div>
  );
}

