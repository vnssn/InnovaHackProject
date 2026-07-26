import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (typeof window !== 'undefined') {
    const aiKey = localStorage.getItem('spendsense_ai_key');
    const aiProvider = localStorage.getItem('spendsense_ai_provider');
    if (aiKey) {
      config.headers['X-AI-API-Key'] = aiKey;
    }
    if (aiProvider) {
      config.headers['X-AI-Provider'] = aiProvider;
    }
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
      originalRequest._retry = true;
      const { refreshToken, setAuth, clearAuth, user } = useAuthStore.getState();
      
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, { refresh_token: refreshToken });
          const { access_token, refresh_token: new_refresh_token } = response.data;
          
          setAuth(access_token, new_refresh_token, user || undefined);
          
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return axios(originalRequest);
        } catch (refreshError) {
          clearAuth();
        }
      } else {
        clearAuth();
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
