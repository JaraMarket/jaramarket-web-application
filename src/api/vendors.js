import axiosInstance from './axios';

export const getVendors = async () => {
  const response = await axiosInstance.get('/vendors');
  return response.data;
};

export const getVendorById = async (id) => {
  const response = await axiosInstance.get(`/vendors/${id}`);
  return response.data;
};

export const getVendorReviews = async (id) => {
  const response = await axiosInstance.get(`/vendors/${id}/reviews`);
  return response.data;
};
