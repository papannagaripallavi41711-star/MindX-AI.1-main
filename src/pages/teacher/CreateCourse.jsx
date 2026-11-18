import { useState } from 'react';
import DashboardLayout from '../../components/common/DashboardLayout';
import { FiSave, FiImage, FiList, FiPlus, FiTrash2, FiX } from 'react-icons/fi';

export default function CreateCourse() {
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    description: '',
    subject: '',
    semester: '',
    duration: '',
    modules: [{ title: '', description: '' }],
  });
  const [saved, setSaved] = useState(false);

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const addModule = () => {
    setFormData(prev => ({ ...prev, modules: [...prev.modules, { title: '', description: '' }] }));
  };

  const removeModule = (index) => {
    setFormData(prev => ({ ...prev, modules: prev.modules.filter((_, i) => i !== index) }));
  };

  const updateModule = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map((m, i) => i === index ? { ...m, [field]: value } : m),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title">Create New Course</h1>
        <p className="page-subtitle">Set up a new course with modules and materials</p>
      </div>

      {saved && (
        <div style={{ padding: '12px 16px', background: 'var(--success-light)', color: 'var(--success)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)', fontSize: 'var(--font-sm)', fontWeight: 500 }}>
          ✅ Course created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="dashboard-grid">
          {/* Basic Info */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: 'var(--space-5)' }}>📝 Basic Information</h3>
            <div className="form-group">
              <label className="form-label">Course Title *</label>
              <input className="form-input" placeholder="e.g. Data Structures & Algorithms" value={formData.title} onChange={(e) => updateField('title', e.target.value)} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label">Course Code *</label>
                <input className="form-input" placeholder="e.g. CS301" value={formData.code} onChange={(e) => updateField('code', e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="form-select" value={formData.subject} onChange={(e) => updateField('subject', e.target.value)}>
                  <option value="">Select Subject</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Electronics">Electronics</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label">Semester</label>
                <select className="form-select" value={formData.semester} onChange={(e) => updateField('semester', e.target.value)}>
                  <option value="">Select Semester</option>
                  {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Duration</label>
                <input className="form-input" placeholder="e.g. 16 weeks" value={formData.duration} onChange={(e) => updateField('duration', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-input" rows={4} placeholder="Describe the course content, objectives, and outcomes..." value={formData.description} onChange={(e) => updateField('description', e.target.value)} style={{ resize: 'vertical' }} />
            </div>
          </div>

          {/* Modules */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
              <h3 className="card-title">📚 Course Modules</h3>
              <button type="button" className="btn btn-sm btn-primary" onClick={addModule}><FiPlus /> Add Module</button>
            </div>
            {formData.modules.map((module, idx) => (
              <div key={idx} style={{ padding: 'var(--space-4)', background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                  <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--primary-600)' }}>Module {idx + 1}</span>
                  {formData.modules.length > 1 && (
                    <button type="button" className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => removeModule(idx)}><FiTrash2 /></button>
                  )}
                </div>
                <div className="form-group" style={{ marginBottom: 'var(--space-3)' }}>
                  <input className="form-input" placeholder="Module title" value={module.title} onChange={(e) => updateModule(idx, 'title', e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <input className="form-input" placeholder="Brief description" value={module.description} onChange={(e) => updateModule(idx, 'description', e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <button type="button" className="btn btn-secondary">Save as Draft</button>
          <button type="submit" className="btn btn-primary btn-lg"><FiSave /> Publish Course</button>
        </div>
      </form>
    </DashboardLayout>
  );
}
