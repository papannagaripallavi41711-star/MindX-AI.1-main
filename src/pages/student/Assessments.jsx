import DashboardLayout from '../../components/common/DashboardLayout';
import { recentAssessments } from '../../data/mockData';
import { FiCheckCircle, FiClock, FiUpload, FiEye, FiFileText } from 'react-icons/fi';

export default function Assessments() {
  const pending = recentAssessments.filter(a => a.status === 'pending');
  const graded = recentAssessments.filter(a => a.status === 'graded');

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title">Assessments</h1>
        <p className="page-subtitle">View and submit your course assessments</p>
      </div>

      {/* Pending Assessments */}
      {pending.length > 0 && (
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <FiClock style={{ color: 'var(--warning)' }} /> Pending Submissions
          </h3>
          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            {pending.map(a => (
              <div className="card animate-slide-up" key={a.id} style={{
                borderLeft: '4px solid var(--warning)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)'
              }}>
                <div>
                  <h4 style={{ fontSize: 'var(--font-base)', fontWeight: 600, marginBottom: '4px' }}>{a.title}</h4>
                  <p style={{ fontSize: 'var(--font-sm)', color: 'var(--gray-500)' }}>{a.course}</p>
                  <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-400)' }}>
                      Due: <strong style={{ color: 'var(--warning)' }}>{a.dueDate}</strong>
                    </span>
                    <span style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-400)' }}>
                      Total Marks: <strong>{a.totalMarks}</strong>
                    </span>
                  </div>
                </div>
                <button className="btn btn-primary"><FiUpload /> Submit</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Graded Assessments */}
      <h3 style={{ fontSize: 'var(--font-lg)', fontWeight: 600, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <FiCheckCircle style={{ color: 'var(--success)' }} /> Graded Assessments
      </h3>
      <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
        {graded.map(a => (
          <div className="card animate-slide-up" key={a.id} style={{
            borderLeft: `4px solid ${a.marksObtained / a.totalMarks >= 0.8 ? 'var(--success)' : a.marksObtained / a.totalMarks >= 0.6 ? 'var(--primary-500)' : 'var(--danger)'}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <div>
                <h4 style={{ fontSize: 'var(--font-base)', fontWeight: 600, marginBottom: '4px' }}>{a.title}</h4>
                <p style={{ fontSize: 'var(--font-sm)', color: 'var(--gray-500)', marginBottom: 'var(--space-2)' }}>{a.course}</p>
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  <span style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-400)' }}>
                    Submitted: {a.submittedDate}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'center', minWidth: '100px' }}>
                <div style={{
                  fontSize: 'var(--font-2xl)', fontWeight: 700,
                  color: a.marksObtained / a.totalMarks >= 0.8 ? 'var(--success)' : a.marksObtained / a.totalMarks >= 0.6 ? 'var(--primary-600)' : 'var(--danger)',
                }}>
                  {a.marksObtained}/{a.totalMarks}
                </div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-400)' }}>
                  {Math.round(a.marksObtained / a.totalMarks * 100)}%
                </div>
              </div>
            </div>
            {a.feedback && (
              <div style={{
                marginTop: 'var(--space-4)', padding: 'var(--space-3) var(--space-4)',
                background: 'var(--gray-50)', borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-sm)', color: 'var(--gray-600)',
              }}>
                <strong style={{ color: 'var(--gray-700)' }}>Feedback:</strong> {a.feedback}
              </div>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
