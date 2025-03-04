import api from './api';

// ✅ Get User Profile
export const fetchUserProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile.');
  }
};

// ✅ Update User Profile
export const updateUserProfile = async (userData: {
  name?: string;
  phoneNo?: string;
  address?: string;
}) => {
  try {
    const response = await api.put('/user/profile', userData);
    return response.data;
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update profile.');
  }
};
