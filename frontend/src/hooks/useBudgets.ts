import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

export const useCreateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { category_id: string; monthly_limit: number; month?: string }) => {
      const response = await api.post('/budgets', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
};
