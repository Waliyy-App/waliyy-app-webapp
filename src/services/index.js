import axios from 'axios';

const API_BASE_URL = 'https://waliyy.onrender.com/api/v1';

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

export const resetPassword = async (token, payload) => {
  try {
    const response = await apiService.put(
      `http://localhost:7345/api/v1/auth/reset-password/${token}`,
      payload
    );
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

export const logoutFunc = async (accessToken) => {
  try {
    const response = await apiService.delete('/auth/logout', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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

export const updateUserProfile = async (payload, id) => {
  try {
    const response = await apiService.put(
      `/parent/child/${id}`,
      payload
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const filterSuitors = async (payload, accessToken, id) => {
  try {
    const response = await apiService.post(
      `parent/child/preference/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChildren = async (accessToken) => {
  try {
    const response = await apiService.get('parent/children', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChild = async (id, accessToken) => {
  try {
    const response = await apiService.get(`/parent/child/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPlans = async () => {
  try {
    const response = await apiService.get('/plans/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const makePayment = async (payload, accessToken) => {
  try {
    const response = await apiService.post('/payment/make-payment', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
