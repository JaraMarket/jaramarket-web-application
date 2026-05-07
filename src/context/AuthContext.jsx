import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, getProfile, logout as apiLogout } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('jara_token');
    if (token) {
      try {
        const data = await getProfile();
        // Assuming data is now the user object directly based on api/auth.js change
        setUser(data);
      } catch (err) {
        localStorage.removeItem('jara_token');
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiLogin(credentials);
      // Assuming data contains token and user properties
      localStorage.setItem('jara_token', data.token);
      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('jara_token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
