import React, { useState } from 'react';
import { MessageSquare, Star, Send, CheckCircle2 } from 'lucide-react';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    subject: '',
    category: 'Course Evaluation',
    rating: 5,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        subject: '',
        category: 'Course Evaluation',
        rating: 5,
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Student Grievance & Feedback</h2>
          <p className="text-xs text-slate-500 mt-0.5">Submit feedback regarding faculty, exams, curriculum or campus facilities</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
          <MessageSquare size={20} />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
            <CheckCircle2 size={48} className="text-emerald-500 animate-bounce" />
            <h3 className="text-lg font-bold text-slate-800">Feedback Submitted Successfully!</h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Thank you for helping us improve our academic curriculum. Your response has been securely forwarded to the academic committee.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Feedback Title / Topic</label>
              <input
                type="text"
                required
                placeholder="e.g. Database Systems Course Pace and Lab Assignments"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                >
                  <option value="Course Evaluation">Course Evaluation</option>
                  <option value="Faculty Feedback">Faculty Feedback</option>
                  <option value="Examination / Grading">Examination / Grading</option>
                  <option value="Infrastructure / Lab">Infrastructure / Lab</option>
                  <option value="General Suggestion">General Suggestion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Satisfaction Rating</label>
                <div className="flex items-center gap-2 pt-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 text-slate-300 hover:text-amber-400 focus:outline-none"
                    >
                      <Star
                        size={22}
                        className={star <= formData.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">{formData.rating} / 5</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Message</label>
              <textarea
                rows="4"
                required
                placeholder="Share your thoughts, observations, or suggestions..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1D61F2] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
              >
                <Send size={15} /> Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

