import axiosInstance from './axios';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/jaram/login', credentials);
  return response.data.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post('/jaram/register', userData);
  return response.data.data;
};

export const getProfile = async () => {
  const response = await axiosInstance.get('/jaram/fetch-user');
  return response.data.data;
};

export const logout = async () => {
  const response = await axiosInstance.post('/jaram/logout');
  return response.data;
};
