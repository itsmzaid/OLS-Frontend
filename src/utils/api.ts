import axios from 'axios';

// const API_BASE_URL = 'https://ols-backend-hrxm.onrender.com';
const API_BASE_URL = 'http://192.168.1.3:3001';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;

      if (errorMessage === 'This email is not registered. Please sign up.') {
        throw new Error('This email is not registered. Please sign up.');
      }

      if (errorMessage === 'Incorrect password. Please try again.') {
        throw new Error('Incorrect password. Please try again.');
      }

      throw new Error(errorMessage || 'An error occurred during login.');
    }

    throw new Error('Network error. Please try again.');
  }
};

export default api;
