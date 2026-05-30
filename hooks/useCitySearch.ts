import { fetchCityOptions } from '@/services/api/geocoding';
import { CityOption } from '@/types/city';

const citySearchCache = new Map<string, CityOption[]>();

export const useCitySearch = async (query: string): Promise<CityOption[]> => {
  const normalized = query.trim().toLowerCase();

  if (normalized.length < 2) {
    return [];
  }

  if (citySearchCache.has(normalized)) {
    return citySearchCache.get(normalized)!;
  }

  const cities = await fetchCityOptions(normalized);
  citySearchCache.set(normalized, cities);

  return cities;
};