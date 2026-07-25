import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setAuth: (accessToken: string, refreshToken: string, user?: User) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setAuth: (accessToken, refreshToken, user) => set({ accessToken, refreshToken, user }),
      setUser: (user) => set({ user }),
      clearAuth: () => set({ accessToken: null, refreshToken: null, user: null }),
    }),
    {
      name: 'auth-storage', // Key for localStorage
    }
  )
);
