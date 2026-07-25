import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useGoals = () => {
  return useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      const response = await api.get('/goals');
      return response.data;
    },
  });
};
