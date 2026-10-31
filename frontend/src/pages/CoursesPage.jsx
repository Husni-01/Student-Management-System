import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BookOpen, Plus, Trash2, UserCheck, Layers, RefreshCw } from 'lucide-react';
import Modal from '../components/Modal';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    course_code: '',
    course_name: '',
    credits: 4,
    instructor: '',
    semester: '5th Semester'
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchCourses = () => {
    setLoading(true);
    api.getCourses()
      .then((res) => {
        if (res.success) setCourses(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.course_code || !newCourse.course_name) return;
    setSubmitting(true);
    try {
      await api.createCourse(newCourse);
      setIsModalOpen(false);
      setNewCourse({
        course_code: '',
        course_name: '',
        credits: 4,
        instructor: '',
        semester: '5th Semester'
      });
      fetchCourses();
    } catch (err) {
      alert(err.message || 'Failed to add course');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to drop/delete this course?')) {
      try {
        await api.deleteCourse(id);
        fetchCourses();
      } catch (err) {
        alert(err.message || 'Failed to delete course');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Enrolled Courses</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage your active semester course registrations and syllabus</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1D61F2] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
        >
          <Plus size={16} /> Enroll New Course
        </button>
      </div>

      {/* Courses Cards Grid */}
      {loading ? (
        <div className="flex justify-center p-12">
          <RefreshCw size={28} className="animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-blue-50 text-[#1D61F2] text-xs font-mono font-bold rounded-lg border border-blue-100">
                    {course.course_code}
                  </span>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="p-1.5 text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Drop Course"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <h3 className="font-bold text-slate-800 text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                  {course.course_name}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <UserCheck size={14} className="text-slate-400" />
                    <span>Faculty: <strong className="text-slate-700 font-medium">{course.instructor}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers size={14} className="text-slate-400" />
                    <span>Credits: <strong className="text-slate-700 font-medium">{course.credits} Credits</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">{course.semester}</span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 font-semibold rounded-full text-[11px]">
                  Enrolled
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enroll Course Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Enroll in Course">
        <form onSubmit={handleAddCourse} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Course Code</label>
            <input
              type="text"
              required
              placeholder="e.g. CS307"
              value={newCourse.course_code}
              onChange={(e) => setNewCourse({ ...newCourse, course_code: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Course Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Artificial Intelligence"
              value={newCourse.course_name}
              onChange={(e) => setNewCourse({ ...newCourse, course_name: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Credits</label>
              <input
                type="number"
                min="1"
                max="6"
                required
                value={newCourse.credits}
                onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Semester</label>
              <input
                type="text"
                required
                value={newCourse.semester}
                onChange={(e) => setNewCourse({ ...newCourse, semester: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Instructor Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Robert Vance"
              value={newCourse.instructor}
              onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-xs font-bold text-white bg-[#1D61F2] hover:bg-blue-700 rounded-xl shadow-xs"
            >
              {submitting ? 'Enrolling...' : 'Confirm Enrollment'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

