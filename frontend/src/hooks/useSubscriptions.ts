import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useSubscriptions = (status?: 'active' | 'cancelled', page = 1, size = 20) => {
  return useQuery({
    queryKey: ['subscriptions', status, page, size],
    queryFn: async () => {
      const response = await api.get('/subscriptions', {
        params: { status, page, size },
      });
      return response.data;
    },
  });
};

export const useSubscriptionLeaks = () => {
  return useQuery({
    queryKey: ['subscriptions', 'leaks'],
    queryFn: async () => {
      const response = await api.get('/subscriptions/leaks');
      return response.data;
    },
  });
};

export const useAddSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { amount: number; custom_name: string; frequency?: string; next_date?: string; category_id?: string }) => {
      const response = await api.post('/subscriptions', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
};
