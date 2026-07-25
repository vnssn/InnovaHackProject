import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useBudgets = (page = 1, size = 20) => {
  return useQuery({
    queryKey: ['budgets', page, size],
    queryFn: async () => {
      const response = await api.get('/budgets', {
        params: { page, size },
      });
      return response.data;
    },
  });
};

export const useBudgetProgress = (id: string) => {
  return useQuery({
    queryKey: ['budgets', id, 'progress'],
    queryFn: async () => {
      const response = await api.get(`/budgets/${id}/progress`);
      return response.data;
    },
    enabled: !!id,
  });
};
