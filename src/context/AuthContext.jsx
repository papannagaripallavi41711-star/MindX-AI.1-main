import { createContext, useContext, useState, useCallback } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email, password, role) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userData = mockUsers[role] || mockUsers.student;
    setUser({ ...userData, role });
    localStorage.setItem('mindx_user', JSON.stringify({ ...userData, role }));
    setIsLoading(false);
    return { success: true, role };
  }, []);

  const register = useCallback(async (formData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const role = formData.role || 'student';
    const userData = {
      ...mockUsers[role],
      name: formData.name,
      email: formData.email,
      role,
    };
    setUser(userData);
    localStorage.setItem('mindx_user', JSON.stringify(userData));
    setIsLoading(false);
    return { success: true, role };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('mindx_user');
  }, []);

  // Check localStorage on mount
  useState(() => {
    const stored = localStorage.getItem('mindx_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem('mindx_user');
      }
    }
  });

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
