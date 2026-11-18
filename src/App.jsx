import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import LandingPage from './pages/landing/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import MyCourses from './pages/student/MyCourses';
import Quizzes from './pages/student/Quizzes';
import Assessments from './pages/student/Assessments';
import AIAssistant from './pages/student/AIAssistant';
import StudyPlan from './pages/student/StudyPlan';
import Recommendations from './pages/student/Recommendations';
import Progress from './pages/student/Progress';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import CreateCourse from './pages/teacher/CreateCourse';
import CreateQuiz from './pages/teacher/CreateQuiz';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

import './styles/index.css';

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  return children;
}

// Redirect authenticated users away from auth pages
function AuthRoute({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to={`/${user.role}`} replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
      <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />

      {/* Student Routes — each sidebar link has its own page */}
      <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/courses" element={<ProtectedRoute allowedRoles={['student']}><MyCourses /></ProtectedRoute>} />
      <Route path="/student/quizzes" element={<ProtectedRoute allowedRoles={['student']}><Quizzes /></ProtectedRoute>} />
      <Route path="/student/assessments" element={<ProtectedRoute allowedRoles={['student']}><Assessments /></ProtectedRoute>} />
      <Route path="/student/ai-assistant" element={<ProtectedRoute allowedRoles={['student']}><AIAssistant /></ProtectedRoute>} />
      <Route path="/student/study-plan" element={<ProtectedRoute allowedRoles={['student']}><StudyPlan /></ProtectedRoute>} />
      <Route path="/student/recommendations" element={<ProtectedRoute allowedRoles={['student']}><Recommendations /></ProtectedRoute>} />
      <Route path="/student/progress" element={<ProtectedRoute allowedRoles={['student']}><Progress /></ProtectedRoute>} />
      <Route path="/student/performance" element={<ProtectedRoute allowedRoles={['student']}><Progress /></ProtectedRoute>} />

      {/* Teacher Routes */}
      <Route path="/teacher" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/teacher/courses" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/teacher/create-course" element={<ProtectedRoute allowedRoles={['teacher']}><CreateCourse /></ProtectedRoute>} />
      <Route path="/teacher/quizzes" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/teacher/assessments" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/teacher/create-quiz" element={<ProtectedRoute allowedRoles={['teacher']}><CreateQuiz /></ProtectedRoute>} />
      <Route path="/teacher/students" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/teacher/performance" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/teacher/analytics" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/courses" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/quizzes" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/departments" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
