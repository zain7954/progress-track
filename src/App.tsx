import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ui/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DailyPage from './pages/DailyPage';
import WeeklyPage from './pages/WeeklyPage';
import MonthlyPage from './pages/MonthlyPage';
import YearlyPage from './pages/YearlyPage';
import PublicProfilePage from './pages/PublicProfilePage';
import PublicProfilesListPage from './pages/PublicProfilesListPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile/:userId" element={<PublicProfilePage />} />

        {/* Protected Dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="daily" replace />} />
          <Route path="daily" element={<DailyPage />} />
          <Route path="weekly" element={<WeeklyPage />} />
          <Route path="monthly" element={<MonthlyPage />} />
          <Route path="yearly" element={<YearlyPage />} />
          <Route path="profiles" element={<PublicProfilesListPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
