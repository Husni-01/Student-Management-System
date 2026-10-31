import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import CoursesPage from './pages/CoursesPage';
import ResultsPage from './pages/ResultsPage';
import AttendancePage from './pages/AttendancePage';
import ExamsPage from './pages/ExamsPage';
import TimetablePage from './pages/TimetablePage';
import NoticeBoardPage from './pages/NoticeBoardPage';
import CalendarPage from './pages/CalendarPage';
import DownloadsPage from './pages/DownloadsPage';
import FeedbackPage from './pages/FeedbackPage';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [student, setStudent] = useState({
    id: 1,
    name: 'Abhishek Verma',
    email: 'abhishek.verma@university.edu',
    roll_no: '21BCSE104',
    program: 'B.Tech CSE',
    current_year: '3rd Year',
    semester: '5th Semester',
    cgpa: 8.45,
    overall_rank: 12,
    total_students: 120,
    overall_attendance: 87.00,
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
  });

  const location = useLocation();

  const getPageTitle = (path) => {
    switch (path) {
      case '/':
        return 'Dashboard';
      case '/profile':
        return 'Student Profile';
      case '/courses':
        return 'Courses';
      case '/results':
        return 'Results & Marks';
      case '/attendance':
        return 'Attendance Records';
      case '/exams':
        return 'Examinations';
      case '/timetable':
        return 'Weekly Timetable';
      case '/notices':
        return 'Notice Board';
      case '/calendar':
        return 'Academic Calendar';
      case '/downloads':
        return 'Downloads & Documents';
      case '/feedback':
        return 'Feedback & Grievances';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-slate-800 antialiased font-sans">
      {/* Responsive Left Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area (offset by sidebar width on desktop) */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header
          onMenuClick={() => setIsSidebarOpen(true)}
          student={student}
          title={getPageTitle(location.pathname)}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-7xl w-full mx-auto">
          <Routes>
            <Route
              path="/"
              element={<DashboardPage student={student} onStudentUpdate={setStudent} />}
            />
            <Route
              path="/profile"
              element={<ProfilePage onStudentUpdate={setStudent} />}
            />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/exams" element={<ExamsPage />} />
            <Route path="/timetable" element={<TimetablePage />} />
            <Route path="/notices" element={<NoticeBoardPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>

          {/* Footer matching blueprint */}
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
