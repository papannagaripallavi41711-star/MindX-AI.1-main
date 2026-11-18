import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT token
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('mindx_user');
  if (user) {
    try {
      const parsed = JSON.parse(user);
      if (parsed.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    } catch (e) {
      // ignore
    }
  }
  return config;
});

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('mindx_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ---- Auth API ----
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/users/me'),
};

// ---- Courses API ----
export const coursesAPI = {
  list: (params) => api.get('/courses', { params }),
  get: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
  enroll: (courseId) => api.post(`/courses/${courseId}/enroll`),
  getStudents: (courseId) => api.get(`/courses/${courseId}/students`),
};

// ---- Quizzes API ----
export const quizzesAPI = {
  list: (params) => api.get('/quizzes', { params }),
  get: (id) => api.get(`/quizzes/${id}`),
  create: (data) => api.post('/quizzes', data),
  submit: (id, answers) => api.post(`/quizzes/${id}/submit`, { answers }),
  results: (id) => api.get(`/quizzes/${id}/results`),
};

// ---- Assessments API ----
export const assessmentsAPI = {
  list: (params) => api.get('/assessments', { params }),
  create: (data) => api.post('/assessments', data),
  submit: (id, text) => api.post(`/assessments/${id}/submit`, { assessment_id: id, submission_text: text }),
  grade: (assessmentId, submissionId, data) => api.post(`/assessments/${assessmentId}/grade/${submissionId}`, data),
};

// ---- AI API ----
export const aiAPI = {
  chat: (message) => api.post('/ai/chat', { message }),
  recommendations: () => api.get('/ai/recommendations'),
  weakTopics: () => api.get('/ai/weak-topics'),
  studyPlan: (data) => api.post('/ai/study-plan', data),
};

export default api;
