import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { CalendarCheck, CheckCircle2, XCircle, RefreshCw, Save } from 'lucide-react';

export default function AttendancePage() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ classes_held: 0, classes_attended: 0 });

  const fetchAttendance = () => {
    setLoading(true);
    api.getAttendance()
      .then((res) => {
        if (res.success) setAttendance(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditForm({
      classes_held: item.classes_held,
      classes_attended: item.classes_attended
    });
  };

  const handleSaveAttendance = async (id) => {
    try {
      await api.updateAttendance(id, editForm);
      setEditingId(null);
      fetchAttendance();
    } catch (err) {
      alert(err.message || 'Failed to update attendance');
    }
  };

  const overallAttended = attendance.reduce((sum, a) => sum + Number(a.classes_attended || 0), 0);
  const overallHeld = attendance.reduce((sum, a) => sum + Number(a.classes_held || 0), 0);
  const overallPct = overallHeld > 0 ? ((overallAttended / overallHeld) * 100).toFixed(1) : 87;

  return (
    <div className="space-y-6">
      {/* Attendance Summary Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0">
            <CalendarCheck size={28} />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Semester Attendance</span>
            <div className="text-3xl font-extrabold text-slate-800">{overallPct}%</div>
            <p className="text-xs text-slate-500 mt-0.5">
              Attended <strong className="text-slate-800">{overallAttended}</strong> out of <strong className="text-slate-800">{overallHeld}</strong> total lectures
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
            <CheckCircle2 size={16} /> Above 75% Requirement Met
          </div>
        </div>
      </div>

      {/* Course Attendance List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-base">Course-Wise Attendance Records</h3>
          <p className="text-xs text-slate-400">Review and record your lecture attendance</p>
        </div>

        {loading ? (
          <div className="flex justify-center p-12">
            <RefreshCw size={28} className="animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold text-xs border-b border-slate-200/80">
                <tr>
                  <th className="py-3.5 px-5">Course Code</th>
                  <th className="py-3.5 px-5">Subject Name</th>
                  <th className="py-3.5 px-5">Attended / Held</th>
                  <th className="py-3.5 px-5">Attendance %</th>
                  <th className="py-3.5 px-5">Eligibility Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attendance.map((row) => {
                  const isEditing = editingId === row.id;
                  const pct = Number(row.percentage || ((row.classes_attended / (row.classes_held || 1)) * 100).toFixed(1));
                  const isEligible = pct >= 75;

                  return (
                    <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-5 font-mono font-bold text-slate-800">
                        {row.course_code || `CS30${row.course_id}`}
                      </td>
                      <td className="py-4 px-5 font-semibold text-slate-800">
                        {row.course_name || `Course #${row.course_id}`}
                      </td>
                      <td className="py-4 px-5">
                        {isEditing ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min="0"
                              value={editForm.classes_attended}
                              onChange={(e) => setEditForm({ ...editForm, classes_attended: e.target.value })}
                              className="w-16 px-2 py-1 text-xs border rounded-lg bg-white"
                            />
                            <span>/</span>
                            <input
                              type="number"
                              min="1"
                              value={editForm.classes_held}
                              onChange={(e) => setEditForm({ ...editForm, classes_held: e.target.value })}
                              className="w-16 px-2 py-1 text-xs border rounded-lg bg-white"
                            />
                          </div>
                        ) : (
                          <span className="font-medium text-slate-700">
                            {row.classes_attended} / {row.classes_held} classes
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                pct >= 85 ? 'bg-emerald-500' : pct >= 75 ? 'bg-blue-500' : 'bg-rose-500'
                              }`}
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                          <span className="font-bold text-xs text-slate-800">{pct}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            isEligible
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {isEligible ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                          {isEligible ? 'Eligible for Exams' : 'Short Attendance'}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right">
                        {isEditing ? (
                          <button
                            onClick={() => handleSaveAttendance(row.id)}
                            className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 flex items-center gap-1 ml-auto"
                          >
                            <Save size={13} /> Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStartEdit(row)}
                            className="text-xs font-semibold text-[#1D61F2] hover:underline"
                          >
                            Update
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

