import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, getProfile, logout as apiLogout, socialLoginGoogle } from '../api/auth';

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
        const response = await getProfile();
        // Standardize: backend returns user in response.data or response.data.data
        const userData = response.data.user || response.data;
        setUser(userData);
      } catch (err) {
        localStorage.removeItem('jara_token');
        localStorage.removeItem('user');
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiLogin(credentials);
      // Backend returns { status, data: { token, user: { ... } } }
      const { token, user } = response.data;
      localStorage.setItem('jara_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (googleData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await socialLoginGoogle(googleData);
      // Backend returns { status, data: { token, user: { ... } } }
      const { token, user } = response.data;
      localStorage.setItem('jara_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return user;
    } catch (err) {
      console.error('Social login error in Context:', err);
      setError(err.response?.data?.message || 'Social login failed');
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
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, checkAuth, socialLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
