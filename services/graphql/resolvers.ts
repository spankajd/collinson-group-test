import { fetchCityOptions } from '@/services/api/geocoding';
import { fetchWeatherForecast } from '@/services/api/weather';

export const searchCities = async (query: string) => {
  return fetchCityOptions(query);
};

export const getForecast = async (lat: number, lon: number) => {
  return fetchWeatherForecast(lat, lon);
};
