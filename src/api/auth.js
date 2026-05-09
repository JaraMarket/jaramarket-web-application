import axiosInstance from './axios';

/**
 * Auth API Service
 * Reconciled with Postman Collection V2
 */

export const login = async (credentials) => {
  const response = await axiosInstance.post('/jaram/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post('/jaram/register', userData);
  return response.data;
};

export const validateOtp = async (otpData) => {
  const response = await axiosInstance.post('/jaram/validate-otp', otpData);
  return response.data;
};

export const resendOtp = async (email) => {
  const response = await axiosInstance.post('/jaram/resend-otp', { email });
  return response.data;
};

export const socialLoginGoogle = async (googleData) => {
  const response = await axiosInstance.post('/jaram/social/google', googleData);
  return response.data;
};

export const socialLoginApple = async (appleData) => {
  const response = await axiosInstance.post('/jaram/social/apple', appleData);
  return response.data;
};

export const socialLoginFacebook = async (fbData) => {
  const response = await axiosInstance.post('/jaram/social/facebook', fbData);
  return response.data;
};

export const getProfile = async () => {
  // Using the jaram prefix for general utility endpoints
  const response = await axiosInstance.get('/jaram/fetch-user');
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post('/jaram/logout');
  return response.data;
};
