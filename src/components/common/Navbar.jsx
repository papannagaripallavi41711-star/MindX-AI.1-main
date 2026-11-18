import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { notifications } from '../../data/mockData';
import { FiSearch, FiBell, FiMenu, FiChevronDown } from 'react-icons/fi';

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="mobile-menu-btn" onClick={onMenuClick}>
          <FiMenu />
        </button>
        <div className="navbar-search">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search courses, quizzes, topics..." />
        </div>
      </div>

      <div className="navbar-right">
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FiBell />
            {unreadCount > 0 && <span className="notification-badge" />}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-dropdown-header">
                <span className="font-semibold" style={{ fontSize: 'var(--font-sm)' }}>
                  Notifications
                </span>
                <button className="text-xs text-primary" style={{ fontWeight: 500 }}>
                  Mark all read
                </button>
              </div>
              {notifications.map(n => (
                <div key={n.id} className={`notification-item ${!n.isRead ? 'unread' : ''}`}>
                  {!n.isRead && <div className="notification-dot" />}
                  <div className="notification-content">
                    <div className="notification-text">
                      <strong>{n.title}</strong> — {n.message}
                    </div>
                    <div className="notification-time">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div ref={userMenuRef} style={{ position: 'relative' }}>
          <div className="user-menu" onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className="user-avatar">{user?.avatar || 'U'}</div>
            <div className="user-info">
              <span className="user-name">{user?.name || 'User'}</span>
              <span className="user-role" style={{ textTransform: 'capitalize' }}>
                {user?.role || 'Student'}
              </span>
            </div>
            <FiChevronDown style={{ color: 'var(--gray-400)', fontSize: '0.9rem' }} />
          </div>

          {showUserMenu && (
            <div className="notification-dropdown" style={{ width: '200px' }}>
              <div style={{ padding: 'var(--space-2)' }}>
                <a href="#" className="sidebar-link" style={{ fontSize: 'var(--font-sm)' }}>
                  Profile Settings
                </a>
                <a href="#" className="sidebar-link" style={{ fontSize: 'var(--font-sm)' }}>
                  Help & Support
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
