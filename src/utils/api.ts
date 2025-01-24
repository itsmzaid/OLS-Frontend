import axios from 'axios';
import Config from 'react-native-config';

// const API_BASE_URL = Config.BACKEND_URL;
const API_BASE_URL = 'http://192.168.211.200:3000';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register user API
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
    if (error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error('Network error. Please try again.');
  }
};

// Login user API
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/user/login', {email, password});
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Network error. Please try again.');
  }
};

export default api;
