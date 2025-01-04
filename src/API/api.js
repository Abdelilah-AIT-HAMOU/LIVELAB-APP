import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-api-url.com', // Replace with your base API URL
  headers: { 'Content-Type': 'application/json' },
});

// GET request
export const getData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Propagate error to handle in UI
  }
};

// POST request
export const postData = async (endpoint, payload) => {
  try {
    const response = await apiClient.post(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};