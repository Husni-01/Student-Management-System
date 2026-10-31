import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-8 pt-4 pb-2 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
      <div>
        © 2026 Student Management System. All rights reserved.
      </div>
      <div className="flex items-center gap-1 font-medium text-slate-500">
        Made with <span className="text-red-500">❤️</span> for Students
      </div>
    </footer>
  );
}

