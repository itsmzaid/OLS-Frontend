import api from './api';

// ✅ Place a new order
export const placeOrder = async (orderData: {
  userId: string;
  totalAmount: number;
  deliveryCharges: number;
  paymentMethod: string;
  pickupDate: string;
  pickupTime: string;
  address: string;
  orderItems: {itemId: string; quantity: number}[];
}) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error: any) {
    console.error('Error placing order:', error);
    throw new Error('Failed to place order.');
  }
};

// ✅ Get all orders for a user
export const fetchUserOrders = async (userId: string) => {
  try {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders.');
  }
};
