import axios from 'axios';

const API_BASE_URL = 'https://waliyy.onrender.com/api/v1';

// const AUTH_TOKEN_KEY = 'auth_token';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  responseType: 'json',
});

export const register = async (payload) => {
  try {
    const response = await apiService.post('/auth/signup', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (payload) => {
  try {
    const response = await apiService.post('/auth/login', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (payload) => {
  try {
    const response = await apiService.post('/auth/forgot-password', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};


