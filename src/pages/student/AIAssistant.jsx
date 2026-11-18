import DashboardLayout from '../../components/common/DashboardLayout';
import AIChatbot from '../../components/ai/AIChatbot';
import { weakTopics, studyPlan } from '../../data/mockData';
import { FiTarget, FiAlertTriangle, FiBookOpen, FiExternalLink, FiCheckCircle, FiClock, FiPlay } from 'react-icons/fi';

export default function AIAssistant() {
  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title">AI Study Assistant</h1>
        <p className="page-subtitle">Your intelligent learning companion powered by AI</p>
      </div>

      <div className="dashboard-grid">
        {/* Chat — Full Size */}
        <div style={{ gridColumn: '1 / -1' }}>
          <AIChatbot />
        </div>

        {/* Weak Topics */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">⚠️ Weak Areas</h3>
            <span className="badge badge-accent">AI Analysis</span>
          </div>
          {weakTopics.map(topic => (
            <div key={topic.id} style={{ marginBottom: 'var(--space-5)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--gray-100)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600 }}>{topic.topic}</span>
                <span className={`badge ${topic.proficiency < 50 ? 'badge-danger' : 'badge-warning'}`}>
                  {topic.proficiency}% proficiency
                </span>
              </div>
              <p style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-500)', marginBottom: 'var(--space-2)', lineHeight: 1.5 }}>
                {topic.suggestion}
              </p>
              <div style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-400)' }}>
                📖 Course: {topic.course}
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)', flexWrap: 'wrap' }}>
                {topic.resources.map((r, i) => (
                  <span key={i} className="badge badge-primary" style={{ cursor: 'pointer' }}>
                    {r}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Study Plan */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📋 Weekly Study Plan</h3>
            <span className="badge badge-primary">AI Generated</span>
          </div>
          {studyPlan.map((day, idx) => (
            <div key={idx} style={{
              display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-3) 0',
              borderBottom: idx < studyPlan.length - 1 ? '1px solid var(--gray-100)' : 'none',
              opacity: day.status === 'completed' ? 0.6 : 1,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: day.status === 'completed' ? 'var(--success-light)' : day.status === 'current' ? 'var(--primary-50)' : 'var(--gray-100)',
                color: day.status === 'completed' ? 'var(--success)' : day.status === 'current' ? 'var(--primary-600)' : 'var(--gray-400)',
              }}>
                {day.status === 'completed' ? <FiCheckCircle size={14} /> : day.status === 'current' ? <FiPlay size={14} /> : <FiClock size={14} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  {day.day}
                  {day.status === 'current' && <span className="badge badge-primary" style={{ fontSize: '10px' }}>Today</span>}
                </div>
                {day.tasks.map((task, ti) => (
                  <div key={ti} style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-500)', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {day.status === 'completed' ? '✅' : '•'} {task}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
