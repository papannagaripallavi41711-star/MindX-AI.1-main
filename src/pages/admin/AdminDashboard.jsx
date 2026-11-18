import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/common/DashboardLayout';
import StatCard from '../../components/common/StatCard';
import {
  adminStats, userGrowthData, courseDistribution, recentRegistrations, platformStats
} from '../../data/mockData';
import {
  FiUsers, FiBook, FiClipboard, FiActivity, FiUserPlus,
  FiGrid, FiSearch, FiFilter, FiEdit, FiTrash2, FiEye,
  FiCheckCircle, FiXCircle, FiUserCheck, FiBookOpen
} from 'react-icons/fi';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const allUsers = [
    { id: 1, name: 'Arjun Sharma', email: 'arjun.s@university.edu', role: 'student', department: 'CSE', status: 'active', joined: '2023-08-15' },
    { id: 2, name: 'Dr. Priya Mehta', email: 'priya.m@university.edu', role: 'teacher', department: 'CSE', status: 'active', joined: '2019-07-01' },
    { id: 3, name: 'Sneha Reddy', email: 'sneha.r@university.edu', role: 'student', department: 'CSE', status: 'active', joined: '2023-08-15' },
    { id: 4, name: 'Dr. Vikram Singh', email: 'vikram.s@university.edu', role: 'teacher', department: 'AI/ML', status: 'active', joined: '2020-01-10' },
    { id: 5, name: 'Rahul Verma', email: 'rahul.v@university.edu', role: 'student', department: 'IT', status: 'inactive', joined: '2022-08-15' },
    { id: 6, name: 'Prof. Anita Desai', email: 'anita.d@university.edu', role: 'teacher', department: 'CSE', status: 'active', joined: '2018-06-01' },
    { id: 7, name: 'Kavya Krishnan', email: 'kavya.k@university.edu', role: 'student', department: 'ECE', status: 'active', joined: '2023-08-15' },
    { id: 8, name: 'Amit Patel', email: 'amit.p@university.edu', role: 'student', department: 'CSE', status: 'active', joined: '2023-08-15' },
  ];

  const filteredUsers = allUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Welcome */}
      <div className="welcome-banner animate-slide-up" style={{
        background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #1D4ED8 100%)',
      }}>
        <h2>Admin Dashboard 🛡️</h2>
        <p>
          Platform overview: {adminStats.totalUsers} total users, {adminStats.totalCourses} courses,
          and {platformStats.dailyActiveUsers} daily active users. All systems operational.
        </p>
        <div className="welcome-date">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard icon={FiUsers} label="Total Users" value={adminStats.totalUsers.toLocaleString()} color="blue" trend="up" trendValue="+47 this month" />
        <StatCard icon={FiUserCheck} label="Total Students" value={adminStats.totalStudents.toLocaleString()} color="green" trend="up" trendValue="+70 enrolled" />
        <StatCard icon={FiBookOpen} label="Total Teachers" value={adminStats.totalTeachers} color="pink" trend="up" trendValue="+7 joined" />
        <StatCard icon={FiBook} label="Total Courses" value={adminStats.totalCourses} color="orange" trend="up" trendValue="+4 new" />
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 'var(--space-6)' }}>
        {['overview', 'users', 'courses', 'platform'].map(tab => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
            style={{ textTransform: 'capitalize' }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="dashboard-grid">
          {/* User Growth */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📈 User Growth</h3>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="students" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3 }} name="Students" />
                  <Line type="monotone" dataKey="teachers" stroke="#EC4899" strokeWidth={2} dot={{ r: 3 }} name="Teachers" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Course Distribution */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📊 Course Distribution</h3>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={courseDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {courseDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Registrations */}
          <div className="card full-width">
            <div className="card-header">
              <h3 className="card-title">🆕 Recent Registrations</h3>
              <button className="btn btn-sm btn-secondary">View All</button>
            </div>
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRegistrations.map(reg => (
                    <tr key={reg.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar" style={{ width: 32, height: 32, fontSize: 'var(--font-xs)',
                            background: reg.role === 'teacher'
                              ? 'linear-gradient(135deg, var(--accent-400), var(--accent-500))'
                              : 'linear-gradient(135deg, var(--primary-500), var(--primary-700))'
                          }}>
                            {reg.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                          <span style={{ fontWeight: 500 }}>{reg.name}</span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--gray-500)' }}>{reg.email}</td>
                      <td>
                        <span className={`badge ${reg.role === 'teacher' ? 'badge-accent' : 'badge-primary'}`}>
                          {reg.role}
                        </span>
                      </td>
                      <td>{reg.department}</td>
                      <td style={{ color: 'var(--gray-500)' }}>{reg.date}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--success)' }}><FiCheckCircle /></button>
                          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }}><FiXCircle /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Platform Stats */}
          <div className="card full-width">
            <div className="card-header">
              <h3 className="card-title">🖥️ Platform Statistics</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-4)' }}>
              {[
                { label: 'Daily Active Users', value: platformStats.dailyActiveUsers, bg: 'var(--primary-50)', color: 'var(--primary-700)' },
                { label: 'Weekly Active Users', value: platformStats.weeklyActiveUsers, bg: 'var(--accent-50)', color: 'var(--accent-500)' },
                { label: 'Avg Session', value: platformStats.avgSessionDuration, bg: 'var(--success-light)', color: 'var(--success)' },
                { label: 'Quiz Attempts', value: platformStats.totalQuizAttempts.toLocaleString(), bg: 'var(--warning-light)', color: 'var(--warning)' },
                { label: 'Assignments', value: platformStats.totalAssignmentsSubmitted.toLocaleString(), bg: '#EDE9FE', color: '#7C3AED' },
                { label: 'Server Uptime', value: platformStats.serverUptime, bg: 'var(--success-light)', color: 'var(--success)' },
              ].map((stat, idx) => (
                <div key={idx} style={{
                  textAlign: 'center', padding: 'var(--space-5)', background: stat.bg,
                  borderRadius: 'var(--radius-md)',
                }}>
                  <div style={{ fontSize: 'var(--font-2xl)', fontWeight: 700, color: stat.color }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-500)', marginTop: '4px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600 }}>
              User Management <span className="badge badge-gray" style={{ marginLeft: '8px' }}>{allUsers.length}</span>
            </h3>
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <FiSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '34px', width: '250px' }}
                />
              </div>
              <button className="btn btn-secondary btn-sm"><FiFilter /> Filter</button>
              <button className="btn btn-primary btn-sm"><FiUserPlus /> Add User</button>
            </div>
          </div>
          <div className="card" style={{ padding: 0 }}>
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(u => (
                    <tr key={u.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar" style={{ width: 32, height: 32, fontSize: 'var(--font-xs)',
                            background: u.role === 'teacher'
                              ? 'linear-gradient(135deg, var(--accent-400), var(--accent-500))'
                              : 'linear-gradient(135deg, var(--primary-500), var(--primary-700))'
                          }}>
                            {u.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                          <span style={{ fontWeight: 500 }}>{u.name}</span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--gray-500)' }}>{u.email}</td>
                      <td>
                        <span className={`badge ${u.role === 'teacher' ? 'badge-accent' : 'badge-primary'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td>{u.department}</td>
                      <td>
                        <span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                          {u.status}
                        </span>
                      </td>
                      <td style={{ color: 'var(--gray-500)' }}>{u.joined}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                          <button className="btn btn-ghost btn-sm"><FiEye /></button>
                          <button className="btn btn-ghost btn-sm"><FiEdit /></button>
                          <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }}><FiTrash2 /></button>
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

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-5)' }}>
            <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600 }}>Course Management</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            {[
              { title: 'Data Structures & Algorithms', code: 'CS301', teacher: 'Dr. Priya Mehta', students: 156, status: 'active', color: 'blue' },
              { title: 'Machine Learning Fundamentals', code: 'AI401', teacher: 'Dr. Vikram Singh', students: 132, status: 'active', color: 'purple' },
              { title: 'Database Management Systems', code: 'CS302', teacher: 'Prof. Anita Desai', students: 178, status: 'active', color: 'green' },
              { title: 'Web Development with React', code: 'SE405', teacher: 'Dr. Priya Mehta', students: 98, status: 'active', color: 'orange' },
              { title: 'Computer Networks', code: 'CS304', teacher: 'Prof. Ramesh Gupta', students: 145, status: 'active', color: 'pink' },
              { title: 'Operating Systems', code: 'CS303', teacher: 'Dr. Suresh Patel', students: 167, status: 'review', color: 'indigo' },
            ].map((course, idx) => (
              <div className="card" key={idx} style={{ padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                  <span className="badge badge-gray">{course.code}</span>
                  <span className={`badge ${course.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{course.status}</span>
                </div>
                <h4 style={{ fontSize: 'var(--font-base)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                  {course.title}
                </h4>
                <p style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-500)', marginBottom: 'var(--space-3)' }}>
                  {course.teacher}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-500)' }}>
                    👨‍🎓 {course.students} students
                  </span>
                  <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
                    <button className="btn btn-ghost btn-sm"><FiEye /></button>
                    <button className="btn btn-ghost btn-sm"><FiEdit /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Platform Tab */}
      {activeTab === 'platform' && (
        <div className="dashboard-grid">
          <div className="card full-width">
            <div className="card-header">
              <h3 className="card-title">📊 Enrollment Trends</h3>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px' }} />
                  <Legend />
                  <Bar dataKey="students" fill="#2563EB" radius={[4, 4, 0, 0]} name="Students" />
                  <Bar dataKey="teachers" fill="#EC4899" radius={[4, 4, 0, 0]} name="Teachers" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">🏢 Departments</h3>
            </div>
            {[
              { name: 'Computer Science & Engineering', courses: 32, faculty: 45 },
              { name: 'Artificial Intelligence & ML', courses: 18, faculty: 22 },
              { name: 'Information Technology', courses: 14, faculty: 18 },
              { name: 'Electronics & Communication', courses: 12, faculty: 28 },
              { name: 'Mathematics', courses: 10, faculty: 15 },
            ].map((dept, idx) => (
              <div key={idx} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: 'var(--space-3) 0', borderBottom: idx < 4 ? '1px solid var(--gray-100)' : 'none',
              }}>
                <div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>{dept.name}</div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-400)' }}>
                    {dept.courses} courses · {dept.faculty} faculty
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm"><FiEye /></button>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">🔧 System Health</h3>
            </div>
            {[
              { label: 'API Response Time', value: '45ms', status: 'good' },
              { label: 'Database Status', value: 'Healthy', status: 'good' },
              { label: 'Storage Used', value: '34.2 GB / 100 GB', status: 'good' },
              { label: 'Server Uptime', value: '99.9%', status: 'good' },
              { label: 'Active Sessions', value: '623', status: 'good' },
            ].map((item, idx) => (
              <div key={idx} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: 'var(--space-3) 0', borderBottom: idx < 4 ? '1px solid var(--gray-100)' : 'none',
              }}>
                <span style={{ fontSize: 'var(--font-sm)', color: 'var(--gray-600)' }}>{item.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--font-sm)', fontWeight: 500 }}>{item.value}</span>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: item.status === 'good' ? 'var(--success)' : 'var(--warning)',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
