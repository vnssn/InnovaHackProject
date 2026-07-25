import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useNotifications = (unreadOnly = false, page = 1, size = 20) => {
  return useQuery({
    queryKey: ['notifications', unreadOnly, page, size],
    queryFn: async () => {
      const response = await api.get('/notifications', {
        params: { unread_only: unreadOnly, page, size },
      });
      return response.data;
    },
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.patch(`/notifications/${id}/read`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await api.patch('/notifications/read-all');
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
