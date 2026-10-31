import React, { useState, useEffect, useCallback } from 'react';
import WelcomeBanner from '../components/WelcomeBanner';
import KPICards from '../components/KPICards';
import RecentResultsTable from '../components/RecentResultsTable';
import NoticeBoard from '../components/NoticeBoard';
import AcademicCalendarWidget from '../components/AcademicCalendarWidget';
import QuickAccess from '../components/QuickAccess';
import PerformanceOverviewChart from '../components/PerformanceOverviewChart';
import ResultModal from '../components/ResultModal';
import NoticeModal from '../components/NoticeModal';
import { api } from '../services/api';
import { RefreshCw, AlertCircle } from 'lucide-react';

export default function DashboardPage({ student, onStudentUpdate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals state
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [editingResult, setEditingResult] = useState(null);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  // Robust Fetcher with AbortController to prevent duplicate calls in React 18/19 StrictMode
  const fetchDashboard = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getDashboardData(1, signal);
      if (res && res.success) {
        setData(res.data);
        if (onStudentUpdate && res.data.student) {
          onStudentUpdate(res.data.student);
        }
      } else {
        throw new Error(res.message || 'Failed to parse dashboard payload');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to connect to SRMS server');
      }
    } finally {
      setLoading(false);
    }
  }, [onStudentUpdate]);

  useEffect(() => {
    const controller = new AbortController();
    fetchDashboard(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchDashboard]);

  // Handle Result CRUD
  const handleSaveResult = async (formData) => {
    if (editingResult) {
      await api.updateResult(editingResult.id, formData);
    } else {
      await api.createResult(formData);
    }
    // Refresh dashboard to recalculate CGPA & metrics
    fetchDashboard();
  };

  const handleDeleteResult = async (id) => {
    if (window.confirm('Are you sure you want to delete this result record?')) {
      await api.deleteResult(id);
      fetchDashboard();
    }
  };

  // Handle Notice Creation
  const handleSaveNotice = async (formData) => {
    await api.createNotice(formData);
    fetchDashboard();
  };

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <RefreshCw size={32} className="animate-spin text-[#1D61F2]" />
        <span className="text-sm font-semibold text-slate-500">Loading student dashboard...</span>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl flex flex-col items-center justify-center text-center gap-3 my-8">
        <AlertCircle size={36} className="text-red-500" />
        <h3 className="font-bold text-red-800 text-lg">Unable to load dashboard data</h3>
        <p className="text-xs text-red-600 max-w-md">{error}</p>
        <button
          onClick={() => fetchDashboard()}
          className="mt-2 px-4 py-2 bg-red-600 text-white font-semibold text-xs rounded-xl hover:bg-red-700 transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Welcome Banner */}
      <WelcomeBanner studentName={`${data?.student?.name || 'Abhishek Verma'}!`} />

      {/* 2. KPI Cards (5 Cards) */}
      <KPICards kpis={data?.kpis} />

      {/* 3. Middle Row: Recent Results & Notice Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 xl:col-span-8">
          <RecentResultsTable
            results={data?.recentResults || []}
            onAddResult={() => {
              setEditingResult(null);
              setIsResultModalOpen(true);
            }}
            onEditResult={(result) => {
              setEditingResult(result);
              setIsResultModalOpen(true);
            }}
            onDeleteResult={handleDeleteResult}
          />
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <NoticeBoard
            notices={data?.notices || []}
            onAddNotice={() => setIsNoticeModalOpen(true)}
          />
        </div>
      </div>

      {/* 4. Bottom Row: Academic Calendar, Quick Access, Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AcademicCalendarWidget />
        <QuickAccess />
        <PerformanceOverviewChart performance={data?.performanceOverview} />
      </div>

      {/* Modals */}
      <ResultModal
        isOpen={isResultModalOpen}
        initialData={editingResult}
        onClose={() => {
          setIsResultModalOpen(false);
          setEditingResult(null);
        }}
        onSubmit={handleSaveResult}
      />

      <NoticeModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        onSubmit={handleSaveNotice}
      />
    </div>
  );
}

