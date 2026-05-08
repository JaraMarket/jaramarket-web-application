import axiosInstance from './axios';

export const getProducts = async () => {
  const response = await axiosInstance.get('/api/products');
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/api/products/${id}`);
  return response.data;
};

export const searchAdvertisements = async () => {
  const response = await axiosInstance.get('/jaram/advertisements');
  return response.data;
};
