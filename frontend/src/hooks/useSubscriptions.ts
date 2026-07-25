import { useQuery } from '@tanstack/react-query';
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
