import type { ForecastDay } from '@/types/weather';

export const rankActivities = (forecast: ForecastDay) => {
  const rankings: string[] = [];

  if (forecast.snowfall >= 20) {
    rankings.push('Skiing');
  }

  if (forecast.maxTemperature >= 24 && forecast.windSpeed >= 15) {
    rankings.push('Surfing');
  }

  if (forecast.rainProbability >= 50) {
    rankings.push('Indoor sightseeing');
  }

  if (forecast.maxTemperature >= 18 && forecast.rainProbability < 40) {
    rankings.push('Outdoor sightseeing');
  }

  if (!rankings.length) {
    rankings.push('Indoor sightseeing');
  }

  return rankings;
};