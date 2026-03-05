import { Link } from 'react-router-dom';
import { Mail, CheckCircle } from 'lucide-react';

export const EmailVerification = () => (
  <div className="text-center">
    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-5">
      <Mail size={28} className="text-blue-600 dark:text-blue-400" />
    </div>
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verify your email</h2>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
      We've sent a verification email to your address. <br />
      Please check your inbox and click the link to activate your account.
    </p>
    <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 mb-6 text-left">
      <div className="flex items-start gap-3">
        <CheckCircle size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p>Check your spam/junk folder if you don't see it.</p>
          <p>The link expires in 24 hours.</p>
        </div>
      </div>
    </div>
    <button className="w-full py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mb-3">
      Resend verification email
    </button>
    <Link to="/login" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Back to sign in</Link>
  </div>
);
