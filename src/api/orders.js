import axiosInstance from './axios';

/**
 * Orders & Payments API Service
 * Reconciled with Postman Collection V2
 */

export const placeOrder = async (orderData) => {
  const response = await axiosInstance.post('/api/orders', orderData);
  return response.data;
};

export const initiateWalletFunding = async (amount) => {
  const response = await axiosInstance.post('/api/payments/initiate', { amount });
  return response.data;
};

export const getWalletStatus = async () => {
  const response = await axiosInstance.get('/jaram/wallet');
  return response.data;
};

export const createSupportTicket = async (ticketData) => {
  const response = await axiosInstance.post('/jaram/support', ticketData);
  return response.data;
};

export const getBanks = async () => {
  const response = await axiosInstance.get('/jaram/banks');
  return response.data;
};
