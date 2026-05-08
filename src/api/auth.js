import axiosInstance from './axios';

// Note: Postman collection uses both /api/ and /jaram/ prefixes.
// axiosInstance already has /api at the end of its baseURL.

export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data.data;
};

export const validateOtp = async (otpData) => {
  // Postman: /jaram/validate-otp
  // Since baseURL has /api, we need to go up one level or use absolute path
  // However, usually Laravel routes are grouped. Let's stick to Postman logic.
  const response = await axiosInstance.post('/../jaram/validate-otp', otpData);
  return response.data;
};

export const resendOtp = async (email) => {
  const response = await axiosInstance.post('/../jaram/resend-otp', { email });
  return response.data;
};

export const socialLoginGoogle = async (googleData) => {
  // Postman: /jaram/social/google
  const response = await axiosInstance.post('/../jaram/social/google', googleData);
  return response.data.data;
};

export const getProfile = async () => {
  const response = await axiosInstance.get('/auth/fetch-user');
  return response.data.data;
};

export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};
