import { Outlet, Link } from 'react-router-dom';
import { BriefcaseBusiness } from 'lucide-react';

export const AuthLayout = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <BriefcaseBusiness size={20} className="text-white" />
          </div>
          TalentFlow
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Smart Job Application & ATS Platform</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
        <Outlet />
      </div>
      <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6">
        © 2024 TalentFlow. All rights reserved.
      </p>
    </div>
  </div>
);
