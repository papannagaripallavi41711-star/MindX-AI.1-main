import DashboardLayout from '../../components/common/DashboardLayout';
import { studyPlan, weakTopics } from '../../data/mockData';
import { FiCheckCircle, FiClock, FiPlay, FiRefreshCw, FiCalendar } from 'react-icons/fi';

export default function StudyPlan() {
  return (
    <DashboardLayout>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div>
            <h1 className="page-title">Study Plan</h1>
            <p className="page-subtitle">AI-generated personalized study schedule for your upcoming exams</p>
          </div>
          <button className="btn btn-primary"><FiRefreshCw /> Regenerate Plan</button>
        </div>
      </div>

      {/* Current Focus */}
      <div className="card" style={{ marginBottom: 'var(--space-6)', borderLeft: '4px solid var(--primary-600)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
          <FiCalendar style={{ color: 'var(--primary-600)' }} />
          <h3 style={{ fontSize: 'var(--font-base)', fontWeight: 600 }}>Current Focus: Binary Trees & BST Quiz</h3>
        </div>
        <p style={{ fontSize: 'var(--font-sm)', color: 'var(--gray-500)' }}>
          Exam date: September 15, 2026 · 5 days remaining · Focus areas: BST operations, AVL rotations, Heap
        </p>
      </div>

      {/* Weekly Plan */}
      <div style={{ display: 'grid', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        {studyPlan.map((day, idx) => {
          const statusConfig = {
            completed: { bg: 'var(--success-light)', border: 'var(--success)', icon: <FiCheckCircle />, label: 'Completed' },
            current: { bg: 'var(--primary-50)', border: 'var(--primary-500)', icon: <FiPlay />, label: 'Today' },
            upcoming: { bg: 'white', border: 'var(--gray-200)', icon: <FiClock />, label: 'Upcoming' },
          };
          const config = statusConfig[day.status];

          return (
            <div
              className="card animate-slide-up"
              key={idx}
              style={{
                borderLeft: `4px solid ${config.border}`,
                background: config.bg,
                opacity: day.status === 'completed' ? 0.75 : 1,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: day.status === 'completed' ? 'var(--success)' : day.status === 'current' ? 'var(--primary-600)' : 'var(--gray-200)',
                    color: day.status === 'upcoming' ? 'var(--gray-500)' : 'white',
                    fontSize: '1rem',
                  }}>
                    {config.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 'var(--font-base)', fontWeight: 600 }}>{day.day}</h4>
                  </div>
                </div>
                <span className={`badge ${day.status === 'completed' ? 'badge-success' : day.status === 'current' ? 'badge-primary' : 'badge-gray'}`}>
                  {config.label}
                </span>
              </div>

              <div style={{ display: 'grid', gap: 'var(--space-2)', paddingLeft: 'calc(40px + var(--space-3))' }}>
                {day.tasks.map((task, ti) => (
                  <div key={ti} style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                    padding: '8px 12px', background: 'rgba(255,255,255,0.7)', borderRadius: 'var(--radius-sm)',
                    fontSize: 'var(--font-sm)', color: 'var(--gray-700)',
                    textDecoration: day.status === 'completed' ? 'line-through' : 'none',
                  }}>
                    {day.status === 'completed' ? '✅' : day.status === 'current' ? '📌' : '⏳'} {task}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Focus Topics */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎯 Priority Topics This Week</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
          {weakTopics.map(topic => (
            <div key={topic.id} style={{
              padding: 'var(--space-4)', background: 'var(--gray-50)', borderRadius: 'var(--radius-md)',
              borderLeft: `3px solid ${topic.proficiency < 50 ? 'var(--danger)' : 'var(--warning)'}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600 }}>{topic.topic}</span>
                <span className={`badge ${topic.proficiency < 50 ? 'badge-danger' : 'badge-warning'}`} style={{ fontSize: '10px' }}>
                  {topic.proficiency}%
                </span>
              </div>
              <p style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-500)', lineHeight: 1.5 }}>{topic.course}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
