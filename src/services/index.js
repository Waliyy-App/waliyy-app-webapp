import axios from 'axios';

const API_BASE_URL = 'https://waliyy.onrender.com/api/v1';

const AUTH_TOKEN_KEY = 'auth_token';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  responseType: 'json',
});

export const register = async (payload) => {
  try {
    const response = await apiService.post('/auth/signup', payload);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (payload) => {
  try {
    const response = await apiService.post('/auth/login', payload);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (payload) => {
  try {
    const response = await apiService.put('/auth/forgot-password', payload);
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (payload) => {
  try {
    const response = await apiService.put('/account/change-password', payload);
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

export const userRegistration = async (payload, accessToken) => {
  try {
    const response = await apiService.post('/parent/child', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const isAuthenticated = () => {
  return getAuthToken();
};

export const filterSuitors = async (payload, accessToken) => {
  try {
    const response = await apiService.post('/child', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const pricing = async () => {
  try {
    const response = await apiService.get('/plans');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const fetchCurrentUser = async (token) => {
//      try {
//     // Set authorization header with the token
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     // Make API request to fetch current user data
//     const response = await apiService.get('/parent/children', config);
//     return response.data; // Assuming the response contains user data
//   } catch (error) {
//     throw error; // Forwarding the error to the caller
//   }
// }
