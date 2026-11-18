import { Link } from 'react-router-dom';
import {
  FiBook, FiBarChart2, FiMessageSquare, FiUsers,
  FiAward, FiTarget, FiArrowRight, FiCheckCircle
} from 'react-icons/fi';

export default function LandingPage() {
  const features = [
    {
      icon: <FiMessageSquare />,
      title: 'AI Study Assistant',
      description: 'Get instant help from our AI chatbot. Ask questions, get explanations, and receive personalized study tips.',
      color: 'var(--primary-50)',
      iconColor: 'var(--primary-600)',
    },
    {
      icon: <FiBarChart2 />,
      title: 'Smart Analytics',
      description: 'Track your performance with detailed analytics. Identify weak areas and monitor progress in real-time.',
      color: 'var(--accent-50)',
      iconColor: 'var(--accent-500)',
    },
    {
      icon: <FiTarget />,
      title: 'Personalized Learning',
      description: 'AI-generated study plans and course recommendations based on your learning style and performance.',
      color: 'var(--success-light)',
      iconColor: 'var(--success)',
    },
    {
      icon: <FiBook />,
      title: 'Course Management',
      description: 'Access comprehensive course materials, video lectures, and interactive content organized by modules.',
      color: 'var(--warning-light)',
      iconColor: 'var(--warning)',
    },
    {
      icon: <FiAward />,
      title: 'Quizzes & Assessments',
      description: 'Take interactive quizzes, submit assignments, and receive instant feedback with detailed scoring.',
      color: '#EDE9FE',
      iconColor: '#7C3AED',
    },
    {
      icon: <FiUsers />,
      title: 'Teacher Dashboard',
      description: 'Comprehensive tools for teachers to manage courses, create quizzes, and track student performance.',
      color: 'var(--primary-50)',
      iconColor: 'var(--primary-600)',
    },
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-nav-logo">
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: 'var(--font-sm)',
          }}>M</div>
          MindX-AI
        </div>
        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="landing-nav-actions">
          <Link to="/login" className="btn btn-ghost">Sign In</Link>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-badge">
            ✨ AI-Powered Education Platform
          </div>
          <h1 className="hero-title">
            Learn Smarter, Not Harder with{' '}
            <span className="highlight">MindX-AI</span>
          </h1>
          <p className="hero-description">
            Experience the future of education with AI-powered personalized learning,
            real-time analytics, and intelligent study assistance designed for modern students and educators.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Start Learning Free <FiArrowRight />
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Sign In
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">1,600+</div>
              <div className="hero-stat-label">Active Students</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">200+</div>
              <div className="hero-stat-label">Expert Teachers</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">86+</div>
              <div className="hero-stat-label">Courses</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">95%</div>
              <div className="hero-stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="features-container">
          <div className="section-header">
            <h2>Everything You Need to Excel</h2>
            <p>
              Powerful tools and AI-driven features designed to transform
              the way you learn and teach.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, idx) => (
              <div className="feature-card" key={idx}>
                <div className="feature-icon" style={{ background: feature.color, color: feature.iconColor }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }} id="about">
        <div className="features-container">
          <div className="section-header">
            <h2>How MindX-AI Works</h2>
            <p>Get started in three simple steps</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-8)', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { step: '01', title: 'Create Your Account', desc: 'Sign up as a student or teacher. Set up your profile with your academic details.' },
              { step: '02', title: 'Explore & Enroll', desc: 'Browse courses, enroll in subjects, and access study materials curated by expert teachers.' },
              { step: '03', title: 'Learn with AI', desc: 'Get personalized study plans, take quizzes, track progress, and chat with the AI assistant.' },
            ].map((item, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary-600), var(--primary-700))',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 'var(--font-lg)', fontWeight: 700, margin: '0 auto var(--space-4)',
                }}>{item.step}</div>
                <h4 style={{ marginBottom: 'var(--space-2)' }}>{item.title}</h4>
                <p style={{ fontSize: 'var(--font-sm)', color: 'var(--gray-500)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="features-container">
          <div className="section-header">
            <h2>What Our Users Say</h2>
            <p>Trusted by students and teachers across the campus</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }}>
            {[
              { name: 'Sneha Reddy', role: 'CSE, 5th Semester', text: 'The AI study assistant helped me improve my DSA scores by 30%. The personalized recommendations are incredibly accurate!', avatar: 'SR' },
              { name: 'Dr. Vikram Singh', role: 'AI/ML Department', text: 'Managing courses and tracking student performance has never been easier. The analytics dashboard gives great insights.', avatar: 'VS' },
              { name: 'Rahul Verma', role: 'IT, 3rd Semester', text: 'I love the quiz system and how MindX-AI identifies my weak topics. The study plans are very helpful during exam time.', avatar: 'RV' },
            ].map((item, idx) => (
              <div key={idx} className="card" style={{ padding: 'var(--space-6)' }}>
                <p style={{ fontSize: 'var(--font-sm)', color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: 'var(--space-5)' }}>
                  "{item.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div className="user-avatar">{item.avatar}</div>
                  <div>
                    <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-500)' }}>{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Transform Your Learning?</h2>
        <p>Join MindX-AI today and experience the power of AI-driven education.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)' }}>
          <Link to="/register" className="btn btn-lg" style={{
            background: 'white', color: 'var(--primary-700)', fontWeight: 600,
          }}>
            Get Started Free <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-brand-name">MindX-AI</div>
              <p>AI-powered smart education platform designed to help students learn smarter and help teachers teach better.</p>
            </div>
            <div className="footer-col">
              <h4>Platform</h4>
              <a href="#">Features</a>
              <a href="#">Courses</a>
              <a href="#">AI Assistant</a>
              <a href="#">Analytics</a>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">Help Center</a>
              <a href="#">Blog</a>
              <a href="#">Community</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
          <div className="footer-bottom">
            © 2026 MindX-AI. All rights reserved. Built for innovation in education.
          </div>
        </div>
      </footer>
    </div>
  );
}
