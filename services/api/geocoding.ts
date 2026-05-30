import { CityOption } from '@/types/city';

const mapCityOption = (result: any): CityOption => ({
  id: result.id,
  name: result.name,
  country: result.country ?? result.country_code ?? 'Unknown',
  admin1: result.admin1 ?? undefined,
  latitude: result.latitude,
  longitude: result.longitude,
});

export const fetchCityOptions = async (query: string): Promise<CityOption[]> => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch city suggestions.');
  }

  const data = await response.json();
  const results = Array.isArray(data.results) ? data.results : [];

  return results.map(mapCityOption);
};
