import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useNotifications = (page = 1, size = 20, unreadOnly = false) => {
  return useQuery({
    queryKey: ['notifications', page, size, unreadOnly],
    queryFn: async () => {
      const response = await api.get('/notifications', {
        params: { page, size, unread_only: unreadOnly },
      });
      return response.data;
    },
  });
};
