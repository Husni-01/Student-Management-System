import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  User,
  BookOpen,
  BarChart3,
  CalendarCheck,
  ClipboardList,
  Clock,
  Megaphone,
  CalendarDays,
  Download,
  MessageSquare,
  LogOut,
  X
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Profile', path: '/profile', icon: User },
  { name: 'Courses', path: '/courses', icon: BookOpen },
  { name: 'Results', path: '/results', icon: BarChart3 },
  { name: 'Attendance', path: '/attendance', icon: CalendarCheck },
  { name: 'Exams', path: '/exams', icon: ClipboardList },
  { name: 'Timetable', path: '/timetable', icon: Clock },
  { name: 'Notice Board', path: '/notices', icon: Megaphone },
  { name: 'Academic Calendar', path: '/calendar', icon: CalendarDays },
  { name: 'Downloads', path: '/downloads', icon: Download },
  { name: 'Feedback', path: '/feedback', icon: MessageSquare },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Top Branding Section (Exact Match to Blueprint) */}
        <div className="p-4">
          <div className="bg-[#1D61F2] rounded-2xl p-5 text-white flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden group">
            {/* Subtle background glow */}
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-sm" />
            <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-sm" />

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden absolute top-2 right-2 text-white/80 hover:text-white"
            >
              <X size={20} />
            </button>

            {/* Cap Icon in circular outline */}
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-2 shadow-inner border border-white/30">
              <GraduationCap size={28} className="text-white" />
            </div>

            <h1 className="text-xl font-extrabold tracking-wider text-white">SMS</h1>
            <p className="text-[11px] text-blue-100 font-medium tracking-tight mt-0.5">
              Student<br />Management System
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${isActive
                    ? 'bg-[#1D61F2] text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      className={isActive ? 'text-white' : 'text-slate-500'}
                    />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Section - Logout */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to log out?')) {
                window.location.href = '/';
              }
            }}
            className="flex items-center gap-3.5 w-full px-4 py-2.5 rounded-xl font-medium text-sm text-red-500 hover:text-red-600 hover:bg-red-50/80 transition-colors"
          >
            <LogOut size={18} className="text-red-500" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

