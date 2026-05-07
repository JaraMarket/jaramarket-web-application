import axiosInstance from './axios';

export const getVendorProfile = async () => {
  const response = await axiosInstance.get('/vendor/profile');
  return response.data;
};

export const getVendorProducts = async () => {
  const response = await axiosInstance.get('/vendor/products');
  return response.data;
};

export const getVendorOrders = async () => {
  const response = await axiosInstance.get('/vendor/orders');
  return response.data;
};

export const getVendorEarnings = async () => {
  const response = await axiosInstance.get('/vendor/earnings');
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await axiosInstance.put(`/vendor/orders/${orderId}/status`, { status });
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axiosInstance.post('/vendor/products', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axiosInstance.put(`/vendor/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/vendor/products/${id}`);
  return response.data;
};

export const getVendorPayouts = async () => {
  const response = await axiosInstance.get('/vendor/payouts');
  return response.data;
};

export const requestPayout = async (payoutData) => {
  const response = await axiosInstance.post('/vendor/payouts/request', payoutData);
  return response.data;
};
