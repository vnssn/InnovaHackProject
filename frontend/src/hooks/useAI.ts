import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useInsights = () => {
  return useQuery({
    queryKey: ['ai', 'insights'],
    queryFn: async () => {
      const response = await api.get('/ai/insights');
      return response.data;
    },
  });
};

export const useCoach = () => {
  return useQuery({
    queryKey: ['ai', 'coach'],
    queryFn: async () => {
      const response = await api.get('/ai/coach');
      return response.data;
    },
  });
};

export const useChat = () => {
  return useMutation({
    mutationFn: async (message: string) => {
      const response = await api.post('/ai/chat', { message });
      return response.data;
    },
  });
};
