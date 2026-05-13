import axiosInstance from './axios';

/**
 * Vendor Management API Service
 * Reconciled with Postman Collection V2
 */

export const getVendorProfile = async () => {
  const response = await axiosInstance.get('/api/vendor/profile');
  return response.data;
};

export const getVendorProducts = async () => {
  const response = await axiosInstance.get('/api/vendor/products');
  return response.data;
};

export const getVendorOrders = async () => {
  const response = await axiosInstance.get('/api/vendor/orders');
  return response.data;
};

export const getVendorEarnings = async () => {
  const response = await axiosInstance.get('/api/vendor/earnings');
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await axiosInstance.put(`/api/vendor/orders/${orderId}/status`, { status });
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axiosInstance.post('/api/vendor/products', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axiosInstance.put(`/api/vendor/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/api/vendor/products/${id}`);
  return response.data;
};

export const getVendorPayouts = async () => {
  const response = await axiosInstance.get('/api/vendor/payouts');
  return response.data;
};

export const requestPayout = async (payoutData) => {
  const response = await axiosInstance.post('/api/vendor/payouts/request', payoutData);
  return response.data;
};
