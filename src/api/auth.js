import axiosInstance from './axios';

/**
 * Auth API Service
 * Using the /api/jaram/ base for all endpoints
 */

export const login = async (credentials) => {
  const response = await axiosInstance.post('/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post('/register', userData);
  return response.data;
};

export const validateOtp = async (otpData) => {
  const response = await axiosInstance.post('/validate-otp', otpData);
  return response.data;
};

export const resendOtp = async (email) => {
  const response = await axiosInstance.post('/resend-otp', { email });
  return response.data;
};

export const socialLoginGoogle = async (googleData) => {
  // Full path will be: .../api/jaram/social/google
  const response = await axiosInstance.post('/social/google', googleData);
  return response.data;
};

export const getProfile = async () => {
  const response = await axiosInstance.get('/fetch-user');
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post('/logout');
  return response.data;
};

export const socialLoginApple = async (appleData) => {
  const response = await axiosInstance.post('/social/apple', appleData);
  return response.data;
};

export const socialLoginFacebook = async (fbData) => {
  const response = await axiosInstance.post('/social/facebook', fbData);
  return response.data;
};
