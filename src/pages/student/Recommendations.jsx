import DashboardLayout from '../../components/common/DashboardLayout';
import { recommendedCourses, courses } from '../../data/mockData';
import { FiStar, FiUsers, FiBookOpen, FiArrowRight } from 'react-icons/fi';

export default function Recommendations() {
  const allRecommended = [
    ...recommendedCourses,
    {
      id: 10,
      title: 'Deep Learning with PyTorch',
      subject: 'AI & ML',
      teacher: 'Dr. Arun Kumar',
      icon: '🧠',
      color: 'purple',
      rating: 4.8,
      enrolledStudents: 76,
      reason: 'Trending among ML students',
    },
    {
      id: 11,
      title: 'Software Testing & QA',
      subject: 'Software Engineering',
      teacher: 'Prof. Meena Sharma',
      icon: '🧪',
      color: 'green',
      rating: 4.4,
      enrolledStudents: 54,
      reason: 'Useful for placement preparation',
    },
    {
      id: 12,
      title: 'Discrete Mathematics',
      subject: 'Mathematics',
      teacher: 'Dr. Ramanujan S.',
      icon: '📐',
      color: 'orange',
      rating: 4.3,
      enrolledStudents: 128,
      reason: 'Foundation for competitive programming',
    },
  ];

  const colorMap = {
    blue: { bg: 'var(--primary-50)', fg: 'var(--primary-600)' },
    pink: { bg: 'var(--accent-50)', fg: 'var(--accent-500)' },
    green: { bg: 'var(--success-light)', fg: 'var(--success)' },
    purple: { bg: '#EDE9FE', fg: '#7C3AED' },
    orange: { bg: 'var(--warning-light)', fg: 'var(--warning)' },
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title">Recommended for You</h1>
        <p className="page-subtitle">AI-powered course recommendations based on your interests and performance</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--space-5)' }}>
        {allRecommended.map(course => {
          const colors = colorMap[course.color] || colorMap.blue;
          return (
            <div className="card animate-slide-up" key={course.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 'var(--radius-lg)', flexShrink: 0,
                  background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem',
                }}>
                  {course.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 'var(--font-base)', fontWeight: 600, marginBottom: '4px' }}>{course.title}</h3>
                  <p style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-500)' }}>{course.subject}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-3)', fontSize: 'var(--font-xs)', color: 'var(--gray-500)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>👨‍🏫 {course.teacher}</span>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-3)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: 'var(--font-xs)', color: 'var(--gray-500)' }}>
                  <FiStar style={{ color: 'var(--warning)', fontSize: '0.85rem' }} /> {course.rating}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: 'var(--font-xs)', color: 'var(--gray-500)' }}>
                  <FiUsers style={{ fontSize: '0.85rem' }} /> {course.enrolledStudents} enrolled
                </span>
              </div>

              <div style={{
                padding: '8px 12px', background: colors.bg, borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--font-xs)', color: colors.fg, fontWeight: 500, marginBottom: 'var(--space-4)',
              }}>
                💡 {course.reason}
              </div>

              <div style={{ marginTop: 'auto' }}>
                <button className="btn btn-primary w-full">Enroll Now <FiArrowRight /></button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
