import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      // Hardcoded categories as requested by user
      return {
        items: [
          { id: '6022df44-914f-4548-ab52-41a1267e3616', name: 'Grocery' },
          { id: 'fd38cb1c-e063-432f-83c4-f2990eb1a3c8', name: 'Lifestyle' },
          { id: 'cfe067c0-fbd5-4bd3-b731-50e1175894f2', name: 'Food' },
          { id: '6ca9641b-5f7b-4fb3-9003-4ae3f73111dc', name: 'Medicine' },
          { id: '803b7106-6f49-4f73-9b07-6efe01329d8e', name: 'Transport' },
          { id: 'ea7cdacb-3bf4-4123-91f4-00a676dac6df', name: 'Entertainment' },
          { id: '65241923-a0da-42cc-ab74-c8f18194540c', name: 'Utilities' },
          { id: 'f0ded8d4-ebe5-451c-bdbd-c62c9dae6353', name: 'Shopping' }
        ]
      };
    },
  });
};
