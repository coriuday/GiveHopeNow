import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // adjust this to match your backend URL

export const createProject = async (projectData) => {
  const response = await axios.post(`${API_URL}/projects`, projectData);
  return response.data;
};

export const getProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};