import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase/client';
import type { User } from '@supabase/supabase-js';

// Layout components
import DashboardLayout from './components/layouts/DashboardLayout';

// Pages
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import UpdatePasswordPage from './pages/UpdatePassword';
import AuthCallbackPage from './pages/AuthCallback';
import AuthErrorPage from './pages/AuthError';

// Dashboard Pages
import DashboardHomePage from './pages/dashboard/Dashboard';
import FineTuningPage from './pages/dashboard/FineTuning';
import DataSourcesPage from './pages/dashboard/DataSources';
import ConnectToolsPage from './pages/dashboard/ConnectTools';
import DeploymentPage from './pages/dashboard/Deployment';
import AnalyticsPage from './pages/dashboard/Analytics';
import StatusPage from './pages/dashboard/Status';
import PlanPage from './pages/dashboard/Plan';
import BillingPage from './pages/dashboard/Billing';
import SupportPage from './pages/dashboard/Support';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Public Route (redirect if logged in)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/auth/auth-code-error" element={<AuthErrorPage />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHomePage />} />
          <Route path="fine-tuning" element={<FineTuningPage />} />
          <Route path="data-sources" element={<DataSourcesPage />} />
          <Route path="connect-tools" element={<ConnectToolsPage />} />
          <Route path="deployment" element={<DeploymentPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="status" element={<StatusPage />} />
          <Route path="plan" element={<PlanPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="support" element={<SupportPage />} />
        </Route>

        {/* 404 Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
