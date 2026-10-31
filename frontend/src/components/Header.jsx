import React, { useState } from 'react';
import { Menu, Search, Bell, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header({ onMenuClick, student, title = 'Dashboard' }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const studentName = student?.name || 'Abhishek Verma';
  const studentProgram = `${student?.program || 'B.Tech CSE'} - ${student?.current_year || '3rd Year'}`;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between">
      {/* Left: Menu toggle + Page Title */}
      <div className="flex items-center gap-3.5">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors lg:hidden"
          title="Toggle Navigation"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
          {title}
        </h1>
      </div>

      {/* Right: Search, Notifications, Profile Dropdown */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-56 lg:w-72 pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 placeholder-slate-400"
          />
        </div>

        {/* Notification Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
              3
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Notifications</span>
                <span className="text-[11px] bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="divide-y divide-slate-50">
                <div className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer">
                  <p className="text-xs font-semibold text-slate-800">End Semester Exam Schedule</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Exams will begin from 25th May 2024</p>
                  <span className="text-[10px] text-blue-500 mt-1 block">15 May 2024</span>
                </div>
                <div className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer">
                  <p className="text-xs font-semibold text-slate-800">Mid Sem Results Out</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Check results for 5 courses</p>
                  <span className="text-[10px] text-blue-500 mt-1 block">12 May 2024</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown Pill */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 p-1 sm:px-2 sm:py-1.5 rounded-full sm:rounded-xl hover:bg-slate-100 transition-colors"
          >
            <img
              src={student?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
              alt={studentName}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/20"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-800 leading-tight">
                Hello, {studentName}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {studentProgram}
              </div>
            </div>
            <ChevronDown size={15} className="text-slate-400 hidden sm:block" />
          </button>

          {/* User Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800">{studentName}</p>
                <p className="text-[11px] text-slate-500">{student?.email || 'abhishek.verma@university.edu'}</p>
              </div>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/profile');
                }}
                className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <User size={14} className="text-slate-400" />
                View Full Profile
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/results');
                }}
                className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Settings size={14} className="text-slate-400" />
                Manage Academic Records
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button
                onClick={() => {
                  setShowDropdown(false);
                  alert('Session logged out');
                }}
                className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut size={14} className="text-red-500" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

