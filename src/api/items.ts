import api from './api';

export const fetchServiceItems = async (serviceName: string) => {
  try {
    const response = await api.get(
      `/items/service/${serviceName.toLowerCase()}`,
    );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching service items:', error);
    throw new Error('Failed to fetch service items.');
  }
};
