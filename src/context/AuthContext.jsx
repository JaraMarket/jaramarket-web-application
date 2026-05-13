import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, getProfile, logout as apiLogout, socialLoginGoogle } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = async () => {
    const token = localStorage.getItem('jara_token');
    if (token) {
      try {
        const response = await getProfile();
        // Backend usually returns { status, message, data: { ...user_fields } }
        // api/auth.js returns response.data
        const userData = response.data || response.user || response;
        setUser(userData);
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('jara_token');
        localStorage.removeItem('user');
        setUser(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiLogin(credentials);
      // api/auth.js returns response.data
      const authData = response.data || response;
      const { token, ...userData } = authData;
      const finalUser = userData.user || userData;

      localStorage.setItem('jara_token', token);
      localStorage.setItem('user', JSON.stringify(finalUser));
      setUser(finalUser);
      return finalUser;
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
      // api/auth.js returns response.data
      const authData = response.data || response;
      const { token, ...userData } = authData;
      const finalUser = userData.user || userData;

      localStorage.setItem('jara_token', token);
      localStorage.setItem('user', JSON.stringify(finalUser));
      setUser(finalUser);
      return finalUser;
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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
