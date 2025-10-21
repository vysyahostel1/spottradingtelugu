import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CoursesProvider } from './context/CoursesContext';
import { SettingsProvider } from './context/SettingsContext';
import { ContactProvider } from './context/ContactContext';
import { EnrollmentProvider } from './context/EnrollmentContext';
import { UserProvider } from './context/UserContext';
import { ReviewsProvider } from './context/ReviewsContext';
import './index.css';

// Dynamic imports for code-splitting
const SpotTradingLanding = React.lazy(() => import('./pages/SpotTradingLanding'));
const Home = React.lazy(() => import('./pages/Home'));
const Courses = React.lazy(() => import('./pages/Courses'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Feedback = React.lazy(() => import('./pages/Feedback'));
const Profile = React.lazy(() => import('./pages/Profile'));
const News = React.lazy(() => import('./pages/News'));

const Payment = React.lazy(() => import('./components/Payment'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
      <p className="text-yellow-400 font-semibold">Loading SPOT TRADING...</p>
    </div>
  </div>
);

// Protected Route component
function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SettingsProvider>
      <CoursesProvider>
        <ContactProvider>
          <EnrollmentProvider>
            <UserProvider>
              <ReviewsProvider>
                <BrowserRouter>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/admin" element={
                        <ProtectedRoute adminOnly={true}>
                          <Admin />
                        </ProtectedRoute>
                      } />
                      <Route path="/" element={<SpotTradingLanding />}>
                        <Route index element={<Home />} />
                        <Route path="courses" element={<Courses />} />
                        <Route path="about" element={<About />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="privacy" element={<Privacy />} />
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="feedback" element={
                          <ProtectedRoute>
                            <Feedback />
                          </ProtectedRoute>
                        } />
                        <Route path="payment" element={
                          <ProtectedRoute>
                            <Payment />
                          </ProtectedRoute>
                        } />
                        <Route path="profile" element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        } />
                        <Route path="news" element={<News />} />

                      </Route>
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </ReviewsProvider>
            </UserProvider>
          </EnrollmentProvider>
        </ContactProvider>
      </CoursesProvider>
    </SettingsProvider>
  </AuthProvider>
);
