import { useQuery } from '@tanstack/react-query';
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
