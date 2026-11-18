import { useState } from 'react';
import DashboardLayout from '../../components/common/DashboardLayout';
import { FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function CreateQuiz() {
  const [formData, setFormData] = useState({
    title: '',
    courseId: '',
    duration: 30,
    questions: [{ question: '', options: ['', '', '', ''], correct: 0, marks: 2 }],
  });
  const [saved, setSaved] = useState(false);

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, { question: '', options: ['', '', '', ''], correct: 0, marks: 2 }],
    }));
  };

  const removeQuestion = (idx) => {
    setFormData(prev => ({ ...prev, questions: prev.questions.filter((_, i) => i !== idx) }));
  };

  const updateQuestion = (idx, field, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => i === idx ? { ...q, [field]: value } : q),
    }));
  };

  const updateOption = (qIdx, oIdx, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => i === qIdx ? { ...q, options: q.options.map((o, j) => j === oIdx ? value : o) } : q),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const totalMarks = formData.questions.reduce((sum, q) => sum + q.marks, 0);

  return (
    <DashboardLayout>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div>
            <h1 className="page-title">Create Quiz</h1>
            <p className="page-subtitle">Build a quiz with multiple-choice questions</p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <span className="badge badge-primary">{formData.questions.length} Questions</span>
            <span className="badge badge-accent">{totalMarks} Marks</span>
          </div>
        </div>
      </div>

      {saved && (
        <div style={{ padding: '12px 16px', background: 'var(--success-light)', color: 'var(--success)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)', fontSize: 'var(--font-sm)', fontWeight: 500 }}>
          ✅ Quiz created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Quiz Info */}
        <div className="card" style={{ marginBottom: 'var(--space-5)' }}>
          <h3 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>📝 Quiz Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 'var(--space-4)' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Quiz Title *</label>
              <input className="form-input" placeholder="e.g. Binary Trees & BST" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} required />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Course *</label>
              <select className="form-select" value={formData.courseId} onChange={(e) => setFormData(prev => ({ ...prev, courseId: e.target.value }))} required>
                <option value="">Select Course</option>
                <option value="1">CS301 — Data Structures</option>
                <option value="4">SE405 — Web Dev React</option>
                <option value="10">CS101 — Python</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Duration (min)</label>
              <input type="number" className="form-input" value={formData.duration} onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 30 }))} min={5} max={180} />
            </div>
          </div>
        </div>

        {/* Questions */}
        {formData.questions.map((q, qIdx) => (
          <div className="card animate-slide-up" key={qIdx} style={{ marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--primary-600)' }}>
                Question {qIdx + 1}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <label style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-500)' }}>Marks:</label>
                  <input type="number" className="form-input" style={{ width: '60px', padding: '4px 8px' }} value={q.marks} onChange={(e) => updateQuestion(qIdx, 'marks', parseInt(e.target.value) || 2)} min={1} max={10} />
                </div>
                {formData.questions.length > 1 && (
                  <button type="button" className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => removeQuestion(qIdx)}>
                    <FiTrash2 />
                  </button>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Question Text *</label>
              <textarea className="form-input" rows={2} placeholder="Enter your question..." value={q.question} onChange={(e) => updateQuestion(qIdx, 'question', e.target.value)} style={{ resize: 'vertical' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              {q.options.map((opt, oIdx) => (
                <div key={oIdx} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <input
                    type="radio"
                    name={`correct-${qIdx}`}
                    checked={q.correct === oIdx}
                    onChange={() => updateQuestion(qIdx, 'correct', oIdx)}
                    style={{ accentColor: 'var(--success)', width: 16, height: 16 }}
                    title="Mark as correct answer"
                  />
                  <input
                    className="form-input"
                    placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                    value={opt}
                    onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                    style={{ flex: 1, borderColor: q.correct === oIdx ? 'var(--success)' : undefined, background: q.correct === oIdx ? 'var(--success-light)' : undefined }}
                  />
                </div>
              ))}
            </div>
            <p style={{ fontSize: 'var(--font-xs)', color: 'var(--gray-400)', marginTop: 'var(--space-2)' }}>
              💡 Select the radio button next to the correct answer
            </p>
          </div>
        ))}

        {/* Add Question + Submit */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-4)' }}>
          <button type="button" className="btn btn-secondary" onClick={addQuestion}><FiPlus /> Add Question</button>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button type="button" className="btn btn-secondary">Save as Draft</button>
            <button type="submit" className="btn btn-primary btn-lg"><FiSave /> Publish Quiz</button>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
