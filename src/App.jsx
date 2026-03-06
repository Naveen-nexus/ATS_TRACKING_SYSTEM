import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { EmailVerification } from './pages/auth/EmailVerification';

// Candidate Pages
import { CandidateDashboard } from './pages/candidate/Dashboard';
import { BrowseJobs } from './pages/candidate/BrowseJobs';
import { JobDetails } from './pages/candidate/JobDetails';
import { Applications } from './pages/candidate/Applications';
import { Resume } from './pages/candidate/Resume';
import { SavedJobs } from './pages/candidate/SavedJobs';
import { Profile } from './pages/candidate/Profile';

// Recruiter Pages
import { RecruiterDashboard } from './pages/recruiter/Dashboard';
import { PostJob } from './pages/recruiter/PostJob';
import { ManageJobs } from './pages/recruiter/ManageJobs';
import { Applicants } from './pages/recruiter/Applicants';
import { Analytics } from './pages/recruiter/Analytics';
import { ResumeAnalysis } from './pages/recruiter/ResumeAnalysis';
import { RecruiterSettings } from './pages/recruiter/Settings';
import { NotFound } from './pages/NotFound';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to={user?.role === 'recruiter' ? '/recruiter/dashboard' : '/candidate/dashboard'} replace />;
  }
  return children;
};

const RootRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={user?.role === 'recruiter' ? '/recruiter/dashboard' : '/candidate/dashboard'} replace />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Root */}
      <Route path="/" element={<RootRedirect />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<EmailVerification />} />
      </Route>

      {/* Candidate Routes */}
      <Route element={<ProtectedRoute allowedRole="candidate"><DashboardLayout /></ProtectedRoute>}>
        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
        <Route path="/candidate/jobs" element={<BrowseJobs />} />
        <Route path="/candidate/jobs/:id" element={<JobDetails />} />
        <Route path="/candidate/applications" element={<Applications />} />
        <Route path="/candidate/resume" element={<Resume />} />
        <Route path="/candidate/saved" element={<SavedJobs />} />
        <Route path="/candidate/profile" element={<Profile />} />
      </Route>

      {/* Recruiter Routes */}
      <Route element={<ProtectedRoute allowedRole="recruiter"><DashboardLayout /></ProtectedRoute>}>
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/post-job" element={<PostJob />} />
        <Route path="/recruiter/jobs" element={<ManageJobs />} />
        <Route path="/recruiter/applicants" element={<Applicants />} />
        <Route path="/recruiter/applicants/:id" element={<ResumeAnalysis />} />
        <Route path="/recruiter/analytics" element={<Analytics />} />
        <Route path="/recruiter/settings" element={<RecruiterSettings />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: { borderRadius: '10px', fontSize: '14px', fontWeight: 500 },
              success: { style: { background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d' } },
              error: { style: { background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' } },
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
