import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useOverviewAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: async () => {
      const response = await api.get('/analytics/overview');
      return response.data;
    },
  });
};

export const useDashboardAnalytics = (days?: number) => {
  return useQuery({
    queryKey: ['analytics', 'dashboard', days],
    queryFn: async () => {
      const response = await api.get('/analytics/dashboard', {
        params: days ? { days } : undefined,
      });
      return response.data;
    },
  });
};

export const useCategoryBreakdown = (days?: number) => {
  return useQuery({
    queryKey: ['analytics', 'category-breakdown', days],
    queryFn: async () => {
      const response = await api.get('/analytics/category-breakdown', {
        params: days ? { days } : undefined,
      });
      return response.data;
    },
  });
};

export const useTrends = (period: '1m' | '3m' | '6m' | '1y' = '1m', category_id?: string) => {
  return useQuery({
    queryKey: ['analytics', 'trends', period, category_id],
    queryFn: async () => {
      const response = await api.get('/analytics/trends', {
        params: { period, category_id },
      });
      return response.data;
    },
  });
};
