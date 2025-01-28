import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_BASE_URL = 'https://ols-backend-hrxm.onrender.com';
const API_BASE_URL = 'http://192.168.1.3:3001';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

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
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.message || 'An error occurred during registration.',
      );
    }
    throw new Error('Network error. Please try again.');
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/user/login', {email, password});
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Login failed');
  }
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem('userToken');
};

export default api;
