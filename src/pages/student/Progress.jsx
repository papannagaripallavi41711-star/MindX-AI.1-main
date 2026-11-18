import DashboardLayout from '../../components/common/DashboardLayout';
import { performanceData, completedQuizzes } from '../../data/mockData';
import { FiTrendingUp, FiAward, FiTarget, FiBarChart2 } from 'react-icons/fi';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, Legend
} from 'recharts';

export default function Progress() {
  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title">My Progress</h1>
        <p className="page-subtitle">Track your learning journey and academic performance</p>
      </div>

      {/* Overview Cards */}
      <div className="stats-grid" style={{ marginBottom: 'var(--space-6)' }}>
        {[
          { label: 'Current GPA', value: performanceData.overallGPA, icon: <FiAward />, color: 'blue', bg: 'var(--primary-50)', tc: 'var(--primary-700)' },
          { label: 'Class Rank', value: `#${performanceData.classRank} / ${performanceData.totalStudents}`, icon: <FiTrendingUp />, color: 'pink', bg: 'var(--accent-50)', tc: 'var(--accent-500)' },
          { label: 'Attendance', value: `${performanceData.attendancePercentage}%`, icon: <FiTarget />, color: 'green', bg: 'var(--success-light)', tc: 'var(--success)' },
          { label: 'Assignments', value: `${performanceData.assignmentsCompleted}/${performanceData.totalAssignments}`, icon: <FiBarChart2 />, color: 'orange', bg: 'var(--warning-light)', tc: 'var(--warning)' },
        ].map((stat, idx) => (
          <div key={idx} className="stat-card" style={{ background: stat.bg }}>
            <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
            <div className="stat-info">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value" style={{ color: stat.tc }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* Performance Over Time */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📈 Score Trend</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData.monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} domain={[50, 100]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px' }} />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2.5} dot={{ fill: '#2563EB', r: 4 }} name="Your Score" />
                <Line type="monotone" dataKey="average" stroke="#D1D5DB" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Class Average" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Radar */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🎯 Subject Strengths</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performanceData.subjects}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="Score" dataKey="score" stroke="#2563EB" fill="#2563EB" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quiz Score History */}
        <div className="card full-width">
          <div className="card-header">
            <h3 className="card-title">📊 Quiz Score History</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={completedQuizzes.map(q => ({ name: q.title.substring(0, 20), score: q.percentage }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px' }} />
                <Bar dataKey="score" fill="#2563EB" radius={[6, 6, 0, 0]} name="Score %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
