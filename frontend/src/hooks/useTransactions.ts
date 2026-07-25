import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface TransactionFilters {
  page: number;
  size: number;
  search?: string;
  category_id?: string;
  merchant_id?: string;
  provider?: string;
  city?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  min_amount?: number;
  max_amount?: number;
  sort_by?: string;
  sort_order?: string;
}

export const useTransactions = (filters: TransactionFilters) => {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: async () => {
      const response = await api.get('/transactions', { params: filters });
      return response.data;
    },
  });
};

export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: ['transactions', id],
    queryFn: async () => {
      const response = await api.get(`/transactions/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useTransactionTimeline = (
  groupBy: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly',
  startDate?: string,
  endDate?: string
) => {
  return useQuery({
    queryKey: ['transactions', 'timeline', groupBy, startDate, endDate],
    queryFn: async () => {
      const response = await api.get('/transactions/timeline', {
        params: { group_by: groupBy, start_date: startDate, end_date: endDate },
      });
      return response.data;
    },
  });
};

export const useTransactionReplay = (date: string) => {
  return useQuery({
    queryKey: ['transactions', 'replay', date],
    queryFn: async () => {
      const response = await api.get('/transactions/replay', { params: { date } });
      return response.data;
    },
    enabled: !!date,
  });
};
