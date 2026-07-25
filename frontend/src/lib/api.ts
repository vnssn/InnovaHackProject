import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
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
let failedQueue: Array<{ resolve: (value: any) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

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
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
        const response = await axios.post(`${baseUrl}/auth/refresh`, {
          refresh_token: refreshToken,
        });
        const { access_token, refresh_token } = response.data;
        useAuthStore.getState().setAuth(access_token, refresh_token, useAuthStore.getState().user!);
        processQueue(null, access_token);
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
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

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch {}
};
