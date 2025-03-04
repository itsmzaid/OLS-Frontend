import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Register User
export const registerUser = async (userData: {
  name: string;
  email: string;
  phoneNo: string;
  password: string;
}) => {
  try {
    const response = await api.post('/user/register', userData);
    return response.data;
  } catch (error: any) {
    console.error('Error during registration:', error);
    throw new Error(
      error.response?.data?.message || 'An error occurred during registration.',
    );
  }
};

// ✅ Login User
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/user/login', {email, password});
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// ✅ Logout User
export const logoutUser = async () => {
  await AsyncStorage.removeItem('userToken');
};
