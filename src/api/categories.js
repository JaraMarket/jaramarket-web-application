import axiosInstance from './axios';

export const getCategories = async () => {
  const response = await axiosInstance.get('/api/categories');
  return response.data;
};
