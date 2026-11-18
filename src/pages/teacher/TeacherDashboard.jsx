import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/common/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import {
  teacherStats, teacherCourses, teacherQuizzes, studentPerformanceList,
  teacherPerformanceData, teacherRecentActivity
} from '../../data/mockData';
import {
  FiUsers, FiBook, FiClipboard, FiTrendingUp, FiPlusCircle,
  FiEdit, FiTrash2, FiEye, FiMoreVertical, FiSearch,
  FiFilter, FiArrowUp, FiArrowDown, FiMinus
} from 'react-icons/fi';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';

// Map URL paths to tab keys
const pathToTab = {
  '/teacher': 'overview',
  '/teacher/courses': 'courses',
  '/teacher/quizzes': 'quizzes',
  '/teacher/assessments': 'quizzes',
  '/teacher/students': 'students',
  '/teacher/performance': 'students',
  '/teacher/analytics': 'overview',
};

export default function TeacherDashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = pathToTab[location.pathname] || 'overview';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = studentPerformanceList.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.enrollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Welcome */}
      <div className="welcome-banner animate-slide-up">
        <h2>Good afternoon, {user?.name?.split(' ')[0] || 'Professor'}! 👩‍🏫</h2>
        <p>
          You have 8 assignments pending review and 3 active quizzes running.
          Student performance is trending upward this month — great work!
        </p>
        <div className="welcome-date">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard icon={FiUsers} label="Total Students" value={teacherStats.totalStudents} color="blue" trend="up" trendValue="+24 this month" />
        <StatCard icon={FiBook} label="My Courses" value={teacherStats.totalCourses} color="pink" trend="stable" trendValue="Active" />
        <StatCard icon={FiClipboard} label="Active Quizzes" value={teacherStats.activeQuizzes} color="green" trend="up" trendValue="2 new" />
        <StatCard icon={FiTrendingUp} label="Avg. Performance" value={`${teacherStats.avgPerformance}%`} color="orange" trend="up" trendValue="+3.2%" />
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 'var(--space-6)' }}>
        {['overview', 'courses', 'quizzes', 'students'].map(tab => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => {
              const tabPaths = { overview: '/teacher', courses: '/teacher/courses', quizzes: '/teacher/quizzes', students: '/teacher/students' };
              navigate(tabPaths[tab] || '/teacher');
            }}
            style={{ textTransform: 'capitalize' }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="dashboard-grid">
          {/* Performance Chart */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📈 Course Performance Trends</h3>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={teacherPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} domain={[50, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="dsa" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} name="DSA" />
                  <Line type="monotone" dataKey="webdev" stroke="#EC4899" strokeWidth={2} dot={{ r: 3 }} name="Web Dev" />
                  <Line type="monotone" dataKey="python" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} name="Python" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">🔔 Recent Activity</h3>
            </div>
            {teacherRecentActivity.map(activity => (
              <div className="activity-item" key={activity.id}>
                <div className={`activity-dot ${activity.type}`} />
                <div>
                  <div className="activity-text">{activity.text}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">⚡ Quick Actions</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              {[
                { label: 'Create Course', icon: <FiPlusCircle />, color: 'var(--primary-50)', textColor: 'var(--primary-700)' },
                { label: 'Create Quiz', icon: <FiClipboard />, color: 'var(--accent-50)', textColor: 'var(--accent-500)' },
                { label: 'View Analytics', icon: <FiTrendingUp />, color: 'var(--success-light)', textColor: 'var(--success)' },
                { label: 'Grade Papers', icon: <FiEdit />, color: 'var(--warning-light)', textColor: 'var(--warning)' },
              ].map((action, idx) => (
                <button key={idx} style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-4)',
                  background: action.color, color: action.textColor,
                  borderRadius: 'var(--radius-md)', fontSize: 'var(--font-sm)',
                  fontWeight: 500, transition: 'all var(--transition-fast)',
                  border: 'none', cursor: 'pointer', width: '100%',
                }}>
                  {action.icon} {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Student Score Distribution */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📊 Score Distribution — DSA</h3>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  { range: '0-40', students: 8 },
                  { range: '41-60', students: 22 },
                  { range: '61-75', students: 45 },
                  { range: '76-85', students: 52 },
                  { range: '86-95', students: 24 },
                  { range: '96-100', students: 5 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px' }} />
                  <Bar dataKey="students" fill="#2563EB" radius={[4, 4, 0, 0]} name="Students" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-5)' }}>
            <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600 }}>My Courses</h3>
            <button className="btn btn-primary btn-sm"><FiPlusCircle /> Create Course</button>
          </div>
          <div className="card" style={{ padding: 0 }}>
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Code</th>
                    <th>Semester</th>
                    <th>Students</th>
                    <th>Avg Score</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherCourses.map(course => (
                    <tr key={course.id}>
                      <td style={{ fontWeight: 500 }}>{course.title}</td>
                      <td><span className="badge badge-gray">{course.code}</span></td>
                      <td>{course.semester}</td>
                      <td>{course.enrolledStudents}</td>
                      <td>
                        <span style={{ color: course.avgScore >= 80 ? 'var(--success)' : course.avgScore >= 70 ? 'var(--warning)' : 'var(--danger)' }}>
                          {course.avgScore}%
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${course.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                          {course.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                          <button className="btn btn-ghost btn-sm" title="View"><FiEye /></button>
                          <button className="btn btn-ghost btn-sm" title="Edit"><FiEdit /></button>
                          <button className="btn btn-ghost btn-sm" title="Delete" style={{ color: 'var(--danger)' }}><FiTrash2 /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Quizzes Tab */}
      {activeTab === 'quizzes' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-5)' }}>
            <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600 }}>Manage Quizzes</h3>
            <button className="btn btn-primary btn-sm"><FiPlusCircle /> Create Quiz</button>
          </div>
          <div className="card" style={{ padding: 0 }}>
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Quiz Title</th>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Questions</th>
                    <th>Attempts</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherQuizzes.map(quiz => (
                    <tr key={quiz.id}>
                      <td style={{ fontWeight: 500 }}>{quiz.title}</td>
                      <td>{quiz.course}</td>
                      <td>{quiz.date}</td>
                      <td>{quiz.totalQuestions}</td>
                      <td>{quiz.attempts}{quiz.avgScore ? ` (Avg: ${quiz.avgScore}%)` : ''}</td>
                      <td>
                        <span className={`badge ${
                          quiz.status === 'completed' ? 'badge-success' :
                          quiz.status === 'active' ? 'badge-primary' : 'badge-warning'
                        }`}>
                          {quiz.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                          <button className="btn btn-ghost btn-sm"><FiEye /></button>
                          <button className="btn btn-ghost btn-sm"><FiEdit /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600 }}>Student Performance</h3>
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <FiSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '34px', width: '250px' }}
                />
              </div>
              <button className="btn btn-secondary btn-sm"><FiFilter /> Filter</button>
            </div>
          </div>
          <div className="card" style={{ padding: 0 }}>
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Enrollment No.</th>
                    <th>Avg Score</th>
                    <th>Quizzes</th>
                    <th>Assignments</th>
                    <th>Grade</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
                    <tr key={student.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar" style={{ width: 32, height: 32, fontSize: 'var(--font-xs)' }}>
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span style={{ fontWeight: 500 }}>{student.name}</span>
                        </div>
                      </td>
                      <td><span className="badge badge-gray">{student.enrollNo}</span></td>
                      <td style={{ fontWeight: 600, color: student.avgScore >= 85 ? 'var(--success)' : student.avgScore >= 70 ? 'var(--primary-600)' : 'var(--danger)' }}>
                        {student.avgScore}%
                      </td>
                      <td>{student.quizzes}/6</td>
                      <td>{student.assignments}/5</td>
                      <td>
                        <span className={`badge ${
                          student.grade.startsWith('A') ? 'badge-success' :
                          student.grade.startsWith('B') ? 'badge-primary' : 'badge-warning'
                        }`}>
                          {student.grade}
                        </span>
                      </td>
                      <td>
                        {student.trend === 'up' && <FiArrowUp style={{ color: 'var(--success)' }} />}
                        {student.trend === 'down' && <FiArrowDown style={{ color: 'var(--danger)' }} />}
                        {student.trend === 'stable' && <FiMinus style={{ color: 'var(--gray-400)' }} />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
