import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface TransactionFilters {
  page: number;
  size: number;
  search?: string;
  category_id?: string;
  start_date?: string;
  end_date?: string;
  min_amount?: number;
  max_amount?: number;
  provider?: string;
}

export const useTransactions = (filters: TransactionFilters) => {
  return useQuery({
    queryKey: ['transactions', filters],
    queryFn: async () => {
      const response = await api.get('/transactions', { params: filters });
      return response.data; // PaginatedTransactions
    },
  });
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { amount: number; description: string; transaction_date: string; category_id?: string; city?: string }) => {
      const response = await api.post('/transactions', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
  });
};

export const useTransactionReplay = (date: string) => {
  return useQuery({
    queryKey: ['transactions', 'replay', date],
    queryFn: async () => {
      const response = await api.get('/transactions/replay', {
        params: { date },
      });
      return response.data;
    },
    enabled: !!date,
  });
};

