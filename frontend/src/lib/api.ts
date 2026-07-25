import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Optionally handle 401 refresh token logic here
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
      // Redirect to login if needed, or handle in component
    }
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  const { access_token, refresh_token, user } = response.data;
  return {
    access_token,
    refresh_token,
    user
  };
};

export const register = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { name, email, password });
  const { access_token, refresh_token, user } = response.data;
  return {
    access_token,
    refresh_token,
    user
  };
};

export const googleLogin = async (idToken: string) => {
  const response = await api.post('/auth/google', { token: idToken });
  const { access_token, refresh_token, user } = response.data;
  return {
    access_token,
    refresh_token,
    user
  };
};

export const fetchUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};
