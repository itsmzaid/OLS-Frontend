import api from './api';

export const createOrder = async (orderData: any) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error: any) {
    console.error('Error creating order:', error);
    throw new Error(error.response?.data?.message || 'Failed to create order');
  }
};

export const getPendingOrder = async () => {
  try {
    const response = await api.get('/orders/pending');
    return response.data;
  } catch (error) {
    console.error('Error fetching pending order:', error);
    throw error;
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching order:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch order');
  }
};

export const getUserOrders = async () => {
  try {
    const response = await api.get('/orders/my-orders');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user orders:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch orders');
  }
};

export const updateOrder = async (orderId: string, updateData: any) => {
  try {
    const response = await api.patch(`/orders/${orderId}`, updateData);
    return response.data;
  } catch (error: any) {
    console.error('Error updating order:', error);
    throw new Error(error.response?.data?.message || 'Failed to update order');
  }
};

export const cancelOrder = async (orderId: string) => {
  try {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error canceling order:', error);
    throw new Error(error.response?.data?.message || 'Failed to cancel order');
  }
};
