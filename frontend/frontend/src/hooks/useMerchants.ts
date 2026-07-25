import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useMerchants = (page = 1, size = 20, search?: string) => {
  return useQuery({
    queryKey: ['merchants', page, size, search],
    queryFn: async () => {
      const response = await api.get('/merchants', {
        params: { page, size, search },
      });
      return response.data;
    },
  });
};

export const useMerchantAnalytics = (id: string) => {
  return useQuery({
    queryKey: ['merchants', id, 'analytics'],
    queryFn: async () => {
      const response = await api.get(`/merchants/${id}/analytics`);
      return response.data;
    },
    enabled: !!id,
  });
};
