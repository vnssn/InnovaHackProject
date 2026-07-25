import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useLocationHeatmap = (month?: number, year?: number) => {
  return useQuery({
    queryKey: ['locations', 'heatmap', month, year],
    queryFn: async () => {
      const response = await api.get('/locations/heatmap', {
        params: { month, year },
      });
      return response.data;
    },
  });
};

export const useLocationClusters = (
  zoom_level = 10,
  north?: number,
  south?: number,
  east?: number,
  west?: number
) => {
  return useQuery({
    queryKey: ['locations', 'clusters', zoom_level, north, south, east, west],
    queryFn: async () => {
      const response = await api.get('/locations/clusters', {
        params: { zoom_level, north, south, east, west },
      });
      return response.data;
    },
  });
};

export const useLocationCities = () => {
  return useQuery({
    queryKey: ['locations', 'top-cities'],
    queryFn: async () => {
      const response = await api.get('/locations/top-cities');
      return response.data;
    },
  });
};

export const useLocationLocalities = (city?: string) => {
  return useQuery({
    queryKey: ['locations', 'top-localities', city],
    queryFn: async () => {
      const response = await api.get('/locations/top-localities', {
        params: { city },
      });
      return response.data;
    },
  });
};
