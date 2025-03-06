import api from './api';

export const getUserData = async () => {
  try {
    const response = await api.get('/user/me');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch user');
  }
};
