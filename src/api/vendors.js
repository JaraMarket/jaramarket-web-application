import axiosInstance from './axios';

export const getVendors = async () => {
  const response = await axiosInstance.get('/api/vendors');
  return response.data;
};

export const getVendorById = async (id) => {
  const response = await axiosInstance.get(`/api/vendors/${id}`);
  return response.data;
};

export const getVendorReviews = async (id) => {
  const response = await axiosInstance.get(`/api/vendors/${id}/reviews`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axiosInstance.get('/api/categories');
  return response.data;
};
