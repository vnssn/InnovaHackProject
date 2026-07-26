import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

export const useCreateGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; target_amount: number; deadline?: string }) => {
      const response = await api.post('/goals', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
};
