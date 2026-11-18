import { useState } from 'react';
import DashboardLayout from '../../components/common/DashboardLayout';
import { upcomingQuizzes, completedQuizzes } from '../../data/mockData';
import {
  FiClock,
  FiPlay,
  FiEye,
  FiCalendar,
  FiAward,
  FiAlertCircle,
  FiX
} from 'react-icons/fi';

export default function Quizzes() {
  const [tab, setTab] = useState('upcoming');
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const closeQuiz = () => {
    setSelectedQuiz(null);
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title">Quizzes</h1>
        <p className="page-subtitle">
          Take quizzes and track your quiz performance
        </p>
      </div>

      <div className="tabs" style={{ marginBottom: 'var(--space-6)' }}>
        <div
          className={`tab ${tab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setTab('upcoming')}
        >
          Upcoming ({upcomingQuizzes.length})
        </div>

        <div
          className={`tab ${tab === 'completed' ? 'active' : ''}`}
          onClick={() => setTab('completed')}
        >
          Completed ({completedQuizzes.length})
        </div>
      </div>

      {tab === 'upcoming' && (
        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
          {upcomingQuizzes.map((quiz) => (
            <div
              className="card animate-slide-up"
              key={quiz.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-5)',
                flexWrap: 'wrap'
              }}
            >
              <div
                className={`stat-icon ${
                  quiz.color === 'purple' ? 'pink' : quiz.color
                }`}
                style={{
                  width: 56,
                  height: 56,
                  fontSize: '1.4rem'
                }}
              >
                <FiClipboard />
              </div>

              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3
                  style={{
                    fontSize: 'var(--font-base)',
                    fontWeight: 600,
                    marginBottom: '4px'
                  }}
                >
                  {quiz.title}
                </h3>

                <p
                  style={{
                    fontSize: 'var(--font-sm)',
                    color: 'var(--gray-500)'
                  }}
                >
                  {quiz.course}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 'var(--space-6)',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: 'var(--font-xs)',
                      color: 'var(--gray-400)',
                      marginBottom: '2px'
                    }}
                  >
                    <FiCalendar /> Date
                  </div>

                  <div
                    style={{
                      fontSize: 'var(--font-sm)',
                      fontWeight: 500
                    }}
                  >
                    {quiz.date}
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: 'var(--font-xs)',
                      color: 'var(--gray-400)',
                      marginBottom: '2px'
                    }}
                  >
                    <FiClock /> Duration
                  </div>

                  <div
                    style={{
                      fontSize: 'var(--font-sm)',
                      fontWeight: 500
                    }}
                  >
                    {quiz.duration}
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: 'var(--font-xs)',
                      color: 'var(--gray-400)',
                      marginBottom: '2px'
                    }}
                  >
                    <FiAlertCircle /> Questions
                  </div>

                  <div
                    style={{
                      fontSize: 'var(--font-sm)',
                      fontWeight: 500
                    }}
                  >
                    {quiz.totalQuestions}
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: 'var(--font-xs)',
                      color: 'var(--gray-400)',
                      marginBottom: '2px'
                    }}
                  >
                    <FiAward /> Marks
                  </div>

                  <div
                    style={{
                      fontSize: 'var(--font-sm)',
                      fontWeight: 500
                    }}
                  >
                    {quiz.totalMarks}
                  </div>
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => startQuiz(quiz)}
              >
                <FiPlay /> Start Quiz
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'completed' && (
        <div className="card" style={{ padding: 0 }}>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Quiz</th>
                  <th>Course</th>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {completedQuizzes.map((q) => (
                  <tr key={q.id} className="animate-fade-in">
                    <td style={{ fontWeight: 500 }}>{q.title}</td>

                    <td style={{ color: 'var(--gray-500)' }}>
                      {q.course}
                    </td>

                    <td>{q.date}</td>

                    <td style={{ fontWeight: 600 }}>
                      {q.score}/{q.totalMarks}
                    </td>

                    <td>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)'
                        }}
                      >
                        <div
                          className="progress-bar"
                          style={{ width: '80px' }}
                        >
                          <div
                            className={`progress-bar-fill ${
                              q.percentage >= 85 ? 'green' : ''
                            }`}
                            style={{
                              width: `${q.percentage}%`
                            }}
                          />
                        </div>

                        <span
                          style={{
                            fontSize: 'var(--font-xs)',
                            fontWeight: 500
                          }}
                        >
                          {q.percentage}%
                        </span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          q.percentage >= 85
                            ? 'badge-success'
                            : q.percentage >= 70
                            ? 'badge-primary'
                            : 'badge-warning'
                        }`}
                      >
                        {q.grade}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() =>
                          alert(
                            `Score: ${q.score}/${q.totalMarks} (${q.percentage}%)`
                          )
                        }
                      >
                        <FiEye /> Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedQuiz && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '600px',
              position: 'relative'
            }}
          >
            <button
              onClick={closeQuiz}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '22px'
              }}
            >
              <FiX />
            </button>

            <h2 style={{ marginBottom: '8px' }}>
              {selectedQuiz.title}
            </h2>

            <p
              style={{
                color: 'var(--gray-500)',
                marginBottom: '20px'
              }}
            >
              {selectedQuiz.course}
            </p>

            <div
              style={{
                padding: '20px',
                borderRadius: '10px',
                background: 'var(--gray-50)',
                marginBottom: '20px'
              }}
            >
              <h3 style={{ marginBottom: '15px' }}>
                Question 1
              </h3>

              <p style={{ marginBottom: '15px' }}>
                Which concept is most important for effective learning?
              </p>

              <label style={{ display: 'block', marginBottom: '10px' }}>
                <input type="radio" name="answer" /> Practice and revision
              </label>

              <label style={{ display: 'block', marginBottom: '10px' }}>
                <input type="radio" name="answer" /> Ignoring mistakes
              </label>

              <label style={{ display: 'block', marginBottom: '10px' }}>
                <input type="radio" name="answer" /> Avoiding assessments
              </label>

              <label style={{ display: 'block' }}>
                <input type="radio" name="answer" /> Studying without breaks
              </label>
            </div>

            <button
              className="btn btn-primary"
              onClick={closeQuiz}
            >
              Finish Quiz
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function FiClipboard() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}