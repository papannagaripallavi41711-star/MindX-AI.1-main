import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiLock, FiUser, FiBookOpen, FiShield, FiHash, FiBook } from 'react-icons/fi';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    department: '',
    semester: '',
    branch: '',
    enrollmentNo: '',
    employeeId: '',
    agreeTerms: false,
  });
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!formData.agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    const result = await register(formData);
    if (result.success) {
      navigate(`/${result.role}`);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-card animate-fade-in" style={{ maxWidth: '480px' }}>
          <div className="auth-logo">
            <div className="auth-logo-icon">M</div>
            <span className="auth-logo-text">MindX-AI</span>
          </div>

          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Join the smart education platform and start learning today</p>

          <div className="role-selector">
            {[
              { key: 'student', label: 'Student', icon: <FiUser /> },
              { key: 'teacher', label: 'Teacher', icon: <FiBookOpen /> },
            ].map(r => (
              <div
                key={r.key}
                className={`role-option ${formData.role === r.key ? 'active' : ''}`}
                onClick={() => updateField('role', r.key)}
              >
                <span className="role-icon">{r.icon}</span>
                {r.label}
              </div>
            ))}
          </div>

          {error && (
            <div style={{
              padding: '10px 14px',
              background: 'var(--danger-light)',
              color: 'var(--danger)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-sm)',
              marginBottom: 'var(--space-4)',
            }}>
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <div className="form-input-icon">
                <FiUser className="icon" />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <div className="form-input-icon">
                <FiMail className="icon" />
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label">Password *</label>
                <div className="form-input-icon">
                  <FiLock className="icon" />
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <div className="form-input-icon">
                  <FiLock className="icon" />
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {formData.role === 'student' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label">Enrollment Number</label>
                    <div className="form-input-icon">
                      <FiHash className="icon" />
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. CSE2023045"
                        value={formData.enrollmentNo}
                        onChange={(e) => updateField('enrollmentNo', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Semester</label>
                    <select
                      className="form-select"
                      value={formData.semester}
                      onChange={(e) => updateField('semester', e.target.value)}
                    >
                      <option value="">Select Semester</option>
                      {[1,2,3,4,5,6,7,8].map(s => (
                        <option key={s} value={s}>{s}st Semester</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Branch</label>
                  <select
                    className="form-select"
                    value={formData.branch}
                    onChange={(e) => updateField('branch', e.target.value)}
                  >
                    <option value="">Select Branch</option>
                    <option value="CSE">Computer Science & Engineering</option>
                    <option value="IT">Information Technology</option>
                    <option value="ECE">Electronics & Communication</option>
                    <option value="EEE">Electrical Engineering</option>
                    <option value="ME">Mechanical Engineering</option>
                    <option value="CE">Civil Engineering</option>
                  </select>
                </div>
              </>
            )}

            {formData.role === 'teacher' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label">Employee ID</label>
                    <div className="form-input-icon">
                      <FiHash className="icon" />
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. FAC2019012"
                        value={formData.employeeId}
                        onChange={(e) => updateField('employeeId', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <select
                      className="form-select"
                      value={formData.department}
                      onChange={(e) => updateField('department', e.target.value)}
                    >
                      <option value="">Select Department</option>
                      <option value="CSE">Computer Science</option>
                      <option value="AI">Artificial Intelligence</option>
                      <option value="IT">Information Technology</option>
                      <option value="ECE">Electronics & Communication</option>
                      <option value="Math">Mathematics</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => updateField('agreeTerms', e.target.checked)}
                />
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full btn-lg"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer" style={{ marginTop: 'var(--space-5)' }}>
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-right-content">
          <div style={{ fontSize: '4rem', marginBottom: 'var(--space-6)' }}>🚀</div>
          <h2>Start Your Journey</h2>
          <p>
            Join thousands of students and teachers on MindX-AI.
            Experience personalized learning powered by artificial intelligence,
            track your progress, and achieve your academic goals.
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            marginTop: 'var(--space-8)',
            textAlign: 'left',
          }}>
            {[
              '✨ AI-powered personalized learning paths',
              '📊 Real-time performance analytics',
              '🧠 Intelligent study recommendations',
              '📝 Interactive quizzes & assessments',
            ].map((item, i) => (
              <div key={i} style={{ fontSize: 'var(--font-sm)', opacity: 0.9 }}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
