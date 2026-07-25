import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

export const api = axios.create({
  baseURL: 'http://localhost:8001/api/v1',
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

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = useAuthStore.getState().refreshToken;

      if (!refreshToken) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post('http://localhost:8001/api/v1/auth/refresh', {
          refresh_token: refreshToken,
        });
        const { access_token, refresh_token: new_refresh } = res.data;
        useAuthStore.getState().setAuth(access_token, new_refresh);
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        refreshQueue.forEach((cb) => cb(access_token));
        refreshQueue = [];
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch {
        useAuthStore.getState().clearAuth();
        refreshQueue = [];
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Login returns user from login response directly — no extra /auth/me call needed
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  const { access_token, refresh_token, user } = response.data;
  useAuthStore.getState().setAuth(access_token, refresh_token, user);
  return { access_token, refresh_token, user };
};

export const register = async (email: string, password: string, name: string, phone?: string) => {
  const response = await api.post('/auth/register', { email, password, name, phone });
  return response.data;
};

export const fetchUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};
