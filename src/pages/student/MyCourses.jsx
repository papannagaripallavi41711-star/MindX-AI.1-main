import { useState } from 'react';
import DashboardLayout from '../../components/common/DashboardLayout';
import { enrolledCourses, courses } from '../../data/mockData';
import { FiSearch, FiFilter, FiStar, FiUsers, FiClock, FiBookOpen } from 'react-icons/fi';

export default function MyCourses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const allCourses = [...enrolledCourses];
  const filtered = allCourses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === 'completed') return matchesSearch && c.progress === 100;
    if (filter === 'in-progress') return matchesSearch && c.progress < 100 && c.progress > 0;
    return matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title">My Courses</h1>
        <p className="page-subtitle">Track your enrolled courses and learning progress</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div className="tabs">
          {[
            { key: 'all', label: 'All Courses' },
            { key: 'in-progress', label: 'In Progress' },
            { key: 'completed', label: 'Completed' },
          ].map(t => (
            <div key={t.key} className={`tab ${filter === t.key ? 'active' : ''}`} onClick={() => setFilter(t.key)}>
              {t.label}
            </div>
          ))}
        </div>
        <div style={{ position: 'relative' }}>
          <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '36px', width: '280px' }}
          />
        </div>
      </div>

      {/* Course Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-5)' }}>
        {filtered.map(course => (
          <div className="course-card animate-slide-up" key={course.id}>
            <div className={`course-card-thumb ${course.color}`}>
              <span style={{ fontSize: '3rem' }}>{course.icon}</span>
            </div>
            <div className="course-card-body">
              <div className="course-card-subject">{course.subject}</div>
              <div className="course-card-title">{course.title}</div>
              <p style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-500)', marginBottom: 'var(--space-3)', lineHeight: 1.5 }}>
                {course.description?.substring(0, 100)}...
              </p>
              <div className="course-card-meta">
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FiUsers style={{ fontSize: '0.85rem' }} /> {course.enrolledStudents}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FiBookOpen style={{ fontSize: '0.85rem' }} /> {course.totalModules} modules
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FiStar style={{ fontSize: '0.85rem', color: 'var(--warning)' }} /> {course.rating}
                </span>
              </div>
              <div style={{ marginTop: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-500)' }}>Progress</span>
                  <span style={{ fontSize: 'var(--font-xs)', fontWeight: 600, color: course.progress === 100 ? 'var(--success)' : 'var(--primary-600)' }}>
                    {course.progress}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className={`progress-bar-fill ${course.progress === 100 ? 'green' : ''}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                  {course.progress === 100 ? 'Review' : 'Continue Learning'}
                </button>
                <button className="btn btn-secondary btn-sm">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <h3>No courses found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </DashboardLayout>
  );
}
