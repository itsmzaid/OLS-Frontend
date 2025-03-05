import api from './api';

// ✅ Get User Data (with Token)
export const getUserData = async () => {
  try {
    const response = await api.get('/user/me'); // Token automatically attach ho raha hai
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch user');
  }
};
