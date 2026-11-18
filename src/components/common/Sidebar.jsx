import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FiHome, FiBook, FiFileText, FiBarChart2, FiMessageSquare,
  FiUsers, FiPlusCircle, FiSettings, FiLogOut, FiAward,
  FiTrendingUp, FiClipboard, FiGrid, FiLayers, FiActivity,
  FiTarget, FiBookOpen
} from 'react-icons/fi';

const sidebarConfig = {
  student: {
    sections: [
      {
        title: 'Main',
        links: [
          { to: '/student', icon: FiHome, label: 'Dashboard' },
          { to: '/student/courses', icon: FiBook, label: 'My Courses' },
          { to: '/student/quizzes', icon: FiClipboard, label: 'Quizzes' },
          { to: '/student/assessments', icon: FiFileText, label: 'Assessments' },
        ],
      },
      {
        title: 'AI Tools',
        links: [
          { to: '/student/ai-assistant', icon: FiMessageSquare, label: 'AI Assistant' },
          { to: '/student/study-plan', icon: FiTarget, label: 'Study Plan' },
          { to: '/student/recommendations', icon: FiBookOpen, label: 'Recommendations' },
        ],
      },
      {
        title: 'Analytics',
        links: [
          { to: '/student/progress', icon: FiTrendingUp, label: 'My Progress' },
          { to: '/student/performance', icon: FiBarChart2, label: 'Performance' },
        ],
      },
    ],
  },
  teacher: {
    sections: [
      {
        title: 'Main',
        links: [
          { to: '/teacher', icon: FiHome, label: 'Dashboard' },
          { to: '/teacher/courses', icon: FiBook, label: 'My Courses' },
          { to: '/teacher/create-course', icon: FiPlusCircle, label: 'Create Course' },
        ],
      },
      {
        title: 'Assessment',
        links: [
          { to: '/teacher/quizzes', icon: FiClipboard, label: 'Manage Quizzes' },
          { to: '/teacher/assessments', icon: FiFileText, label: 'Assessments' },
          { to: '/teacher/create-quiz', icon: FiPlusCircle, label: 'Create Quiz' },
        ],
      },
      {
        title: 'Analytics',
        links: [
          { to: '/teacher/students', icon: FiUsers, label: 'Students' },
          { to: '/teacher/performance', icon: FiBarChart2, label: 'Performance' },
          { to: '/teacher/analytics', icon: FiActivity, label: 'Analytics' },
        ],
      },
    ],
  },
  admin: {
    sections: [
      {
        title: 'Overview',
        links: [
          { to: '/admin', icon: FiHome, label: 'Dashboard' },
          { to: '/admin/analytics', icon: FiActivity, label: 'Analytics' },
        ],
      },
      {
        title: 'Management',
        links: [
          { to: '/admin/users', icon: FiUsers, label: 'Users' },
          { to: '/admin/courses', icon: FiBook, label: 'Courses' },
          { to: '/admin/quizzes', icon: FiClipboard, label: 'Quizzes' },
        ],
      },
      {
        title: 'System',
        links: [
          { to: '/admin/departments', icon: FiGrid, label: 'Departments' },
          { to: '/admin/reports', icon: FiLayers, label: 'Reports' },
          { to: '/admin/settings', icon: FiSettings, label: 'Settings' },
        ],
      },
    ],
  },
};

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const role = user?.role || 'student';
  const config = sidebarConfig[role] || sidebarConfig.student;

  const isActive = (path) => {
    if (path === `/${role}`) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">M</div>
          <div className="sidebar-brand">
            <span className="sidebar-brand-name">MindX-AI</span>
            <span className="sidebar-brand-tag">Smart Education</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {config.sections.map((section, idx) => (
            <div className="sidebar-section" key={idx}>
              <div className="sidebar-section-title">{section.title}</div>
              {section.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`sidebar-link ${isActive(link.to) ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <link.icon className="link-icon" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link w-full" onClick={logout} style={{ color: 'var(--gray-500)' }}>
            <FiLogOut className="link-icon" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
