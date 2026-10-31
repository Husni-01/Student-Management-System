import React, { useState, useEffect } from 'react';
import Modal from './Modal';

export default function ResultModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    subject: '',
    exam_type: 'Mid Sem',
    score: 85,
    max_score: 100,
    exam_date: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        subject: initialData.subject || '',
        exam_type: initialData.exam_type || 'Mid Sem',
        score: initialData.score || 85,
        max_score: initialData.max_score || 100,
        exam_date: initialData.exam_date ? initialData.exam_date.split('T')[0] : new Date().toISOString().split('T')[0]
      });
    } else {
      setFormData({
        subject: '',
        exam_type: 'Mid Sem',
        score: 85,
        max_score: 100,
        exam_date: new Date().toISOString().split('T')[0]
      });
    }
    setError('');
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject.trim()) {
      setError('Please enter a valid subject name.');
      return;
    }
    if (Number(formData.score) < 0 || Number(formData.score) > Number(formData.max_score)) {
      setError(`Score must be between 0 and ${formData.max_score}.`);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Result Record' : 'Add New Exam Result'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-100">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Subject Name
          </label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g. Distributed Computing"
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Exam Type
            </label>
            <select
              value={formData.exam_type}
              onChange={(e) => setFormData({ ...formData, exam_type: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
            >
              <option value="Mid Sem">Mid Sem</option>
              <option value="End Sem">End Sem</option>
              <option value="Quiz / Test">Quiz / Test</option>
              <option value="Lab Practical">Lab Practical</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Exam Date
            </label>
            <input
              type="date"
              required
              value={formData.exam_date}
              onChange={(e) => setFormData({ ...formData, exam_date: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Obtained Score
            </label>
            <input
              type="number"
              min="0"
              max={formData.max_score}
              required
              value={formData.score}
              onChange={(e) => setFormData({ ...formData, score: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Max Score
            </label>
            <input
              type="number"
              min="1"
              required
              value={formData.max_score}
              onChange={(e) => setFormData({ ...formData, max_score: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 text-xs font-bold text-white bg-[#1D61F2] hover:bg-blue-700 rounded-xl shadow-xs transition-colors disabled:opacity-50"
          >
            {submitting ? 'Saving...' : initialData ? 'Update Record' : 'Save Result'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

