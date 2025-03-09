import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Add axios interceptor for token handling
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await axios.post(`${API_URL}/projects`, projectData);
  return response.data;
};

export const makeDonation = async (donationData) => {
  const response = await axios.post(`${API_URL}/donations`, donationData);
  return response.data;
};

export const fetchProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};

export const fetchDonations = async () => {
  const response = await axios.get(`${API_URL}/donations`);
  return response.data;
};
