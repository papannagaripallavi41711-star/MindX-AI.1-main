import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/common/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import AIChatbot from '../../components/ai/AIChatbot';
import {
  enrolledCourses, upcomingQuizzes, recentAssessments,
  performanceData, recommendedCourses, weakTopics, completedQuizzes
} from '../../data/mockData';
import {
  FiBook, FiAward, FiCheckCircle, FiClock, FiTrendingUp,
  FiStar, FiAlertTriangle, FiArrowRight, FiCalendar
} from 'react-icons/fi';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, Legend
} from 'recharts';

export default function StudentDashboard() {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <div className="welcome-banner animate-slide-up">
        <h2>Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋</h2>
        <p>
          You're making great progress! You've completed 67% of your DSA course and
          have an upcoming quiz on Binary Trees. Keep up the excellent work!
        </p>
        <div className="welcome-date">{today}</div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard icon={FiBook} label="Enrolled Courses" value="4" color="blue" trend="up" trendValue="+1 this month" />
        <StatCard icon={FiAward} label="Average Score" value="83%" color="pink" trend="up" trendValue="+5% from last month" />
        <StatCard icon={FiCheckCircle} label="Quizzes Completed" value="6" color="green" trend="up" trendValue="3 this week" />
        <StatCard icon={FiClock} label="Study Hours" value="42h" color="orange" trend="up" trendValue="+8h this week" />
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Enrolled Courses */}
        <div className="card full-width animate-slide-up">
          <div className="card-header">
            <h3 className="card-title">📚 My Enrolled Courses</h3>
            <button className="btn btn-sm btn-secondary">View All</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            {enrolledCourses.map(course => (
              <div className="course-card" key={course.id}>
                <div className={`course-card-thumb ${course.color}`}>
                  <span>{course.icon}</span>
                </div>
                <div className="course-card-body">
                  <div className="course-card-subject">{course.subject}</div>
                  <div className="course-card-title">{course.title}</div>
                  <div className="course-card-meta">
                    <span>👨‍🏫 {course.teacher}</span>
                    <span>📖 {course.totalModules} modules</span>
                  </div>
                  <div className="course-card-progress">
                    <div className="progress-bar" style={{ flex: 1 }}>
                      <div
                        className={`progress-bar-fill ${course.progress === 100 ? 'green' : ''}`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span>{course.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📈 Performance Trend</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData.monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} domain={[60, 100]} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px', border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', fontSize: '13px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2.5}
                  dot={{ fill: '#2563EB', r: 4 }} name="Your Score" />
                <Line type="monotone" dataKey="average" stroke="#D1D5DB" strokeWidth={2}
                  strokeDasharray="5 5" dot={false} name="Class Average" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Strength Radar */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🎯 Subject Strength</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={performanceData.subjects}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="Score" dataKey="score" stroke="#2563EB" fill="#2563EB" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Quizzes */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📝 Upcoming Quizzes</h3>
          </div>
          {upcomingQuizzes.map(quiz => (
            <div className="quiz-card" key={quiz.id}>
              <div className={`quiz-icon stat-icon ${quiz.color === 'purple' ? 'pink' : quiz.color}`}>
                <FiCalendar />
              </div>
              <div className="quiz-info">
                <div className="quiz-name">{quiz.title}</div>
                <div className="quiz-meta">{quiz.course} · {quiz.date} · {quiz.duration}</div>
              </div>
              <div className="quiz-action">
                <span className="badge badge-primary">{quiz.totalQuestions} Qs</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Assessment Results */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">✅ Recent Assessments</h3>
          </div>
          {recentAssessments.map(assessment => (
            <div className="quiz-card" key={assessment.id}>
              <div className={`quiz-icon stat-icon ${assessment.status === 'graded' ? 'green' : 'orange'}`}>
                {assessment.status === 'graded' ? <FiCheckCircle /> : <FiClock />}
              </div>
              <div className="quiz-info">
                <div className="quiz-name">{assessment.title}</div>
                <div className="quiz-meta">
                  {assessment.course} · {assessment.status === 'graded'
                    ? `Score: ${assessment.marksObtained}/${assessment.totalMarks}`
                    : `Due: ${assessment.dueDate}`
                  }
                </div>
              </div>
              <div className="quiz-action">
                <span className={`badge ${assessment.status === 'graded' ? 'badge-success' : 'badge-warning'}`}>
                  {assessment.status === 'graded' ? `${Math.round(assessment.marksObtained / assessment.totalMarks * 100)}%` : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Weak Topics (AI) */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">⚠️ Areas to Improve</h3>
            <span className="badge badge-accent">AI Analysis</span>
          </div>
          {weakTopics.map(topic => (
            <div key={topic.id} style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--gray-800)' }}>
                  {topic.topic}
                </span>
                <span style={{ fontSize: 'var(--font-xs)', color: topic.proficiency < 50 ? 'var(--danger)' : 'var(--warning)' }}>
                  {topic.proficiency}%
                </span>
              </div>
              <div className="progress-bar" style={{ marginBottom: '4px' }}>
                <div className="progress-bar-fill pink" style={{ width: `${topic.proficiency}%` }} />
              </div>
              <p style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-500)', marginTop: '2px' }}>
                {topic.suggestion.substring(0, 80)}...
              </p>
            </div>
          ))}
        </div>

        {/* AI Chat */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <AIChatbot compact />
        </div>

        {/* Recommended Courses */}
        <div className="card full-width">
          <div className="card-header">
            <h3 className="card-title">💡 Recommended for You</h3>
            <span className="badge badge-accent">AI Powered</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
            {recommendedCourses.map(course => (
              <div className="recommendation-card" key={course.id}>
                <div className="recommendation-icon" style={{
                  background: course.color === 'pink' ? 'var(--accent-50)' : course.color === 'green' ? 'var(--success-light)' : 'var(--primary-50)',
                  color: course.color === 'pink' ? 'var(--accent-500)' : course.color === 'green' ? 'var(--success)' : 'var(--primary-600)',
                  fontSize: '1.5rem'
                }}>
                  {course.icon}
                </div>
                <div className="recommendation-info">
                  <div className="recommendation-title">{course.title}</div>
                  <div className="recommendation-desc">
                    {course.teacher} · ⭐ {course.rating} · {course.enrolledStudents} enrolled
                  </div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--accent-500)', marginTop: '4px' }}>
                    {course.reason}
                  </div>
                </div>
                <button className="btn btn-sm btn-primary" style={{ flexShrink: 0, alignSelf: 'center' }}>
                  Enroll
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🏆 Academic Overview</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <div style={{ textAlign: 'center', padding: 'var(--space-4)', background: 'var(--primary-50)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 'var(--font-3xl)', fontWeight: 700, color: 'var(--primary-700)' }}>
                {performanceData.overallGPA}
              </div>
              <div style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-500)' }}>Current GPA</div>
            </div>
            <div style={{ textAlign: 'center', padding: 'var(--space-4)', background: 'var(--accent-50)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 'var(--font-3xl)', fontWeight: 700, color: 'var(--accent-500)' }}>
                #{performanceData.classRank}
              </div>
              <div style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-500)' }}>Class Rank / {performanceData.totalStudents}</div>
            </div>
            <div style={{ textAlign: 'center', padding: 'var(--space-4)', background: 'var(--success-light)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 'var(--font-3xl)', fontWeight: 700, color: 'var(--success)' }}>
                {performanceData.attendancePercentage}%
              </div>
              <div style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-500)' }}>Attendance</div>
            </div>
            <div style={{ textAlign: 'center', padding: 'var(--space-4)', background: 'var(--warning-light)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 'var(--font-3xl)', fontWeight: 700, color: 'var(--warning)' }}>
                {performanceData.assignmentsCompleted}/{performanceData.totalAssignments}
              </div>
              <div style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-500)' }}>Assignments Done</div>
            </div>
          </div>
        </div>

        {/* Completed Quizzes */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📊 Quiz History</h3>
          </div>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Quiz</th>
                  <th>Score</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {completedQuizzes.map(q => (
                  <tr key={q.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{q.title}</div>
                      <div style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-400)' }}>{q.course}</div>
                    </td>
                    <td>{q.score}/{q.totalMarks} ({q.percentage}%)</td>
                    <td>
                      <span className={`badge ${q.percentage >= 85 ? 'badge-success' : q.percentage >= 70 ? 'badge-primary' : 'badge-warning'}`}>
                        {q.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
