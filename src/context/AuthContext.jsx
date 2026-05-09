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
        // Backend returns { status, message, data: { ...user_fields } }
        const userData = response.data.data || response.data;
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
      // Backend returns { status, message, data: { ..., token } }
      const { token, ...userData } = response.data.data;
      
      localStorage.setItem('jara_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        if (err.response.status === 401) {
          setError('Invalid email or password. Please try again.');
        } else {
          setError(err.response.data.message || 'Login failed. Please try again.');
        }
      } else if (err.request) {
        setError('No response from server. Please check your internet connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
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
      // Backend returns { status, message, data: { ..., token } }
      const { token, ...userData } = response.data.data;
      
      localStorage.setItem('jara_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Social login error in Context:', err);
      if (err.response) {
        setError(err.response.data.message || 'Social login failed. Please try again.');
      } else if (err.request) {
        setError('No response from server. Please check your internet connection.');
      } else {
        setError('Social login failed. Please try again.');
      }
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
