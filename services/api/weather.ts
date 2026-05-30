import { ForecastDay, ForecastSummary } from '@/types/weather';

const getWeatherDescription = (code: number) => {
  const weatherMap: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Fog',
    51: 'Drizzle',
    53: 'Light drizzle',
    55: 'Dense drizzle',
    61: 'Rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Snow',
    73: 'Heavy snow',
    75: 'Storm snow',
    80: 'Showers',
    81: 'Heavy showers',
    82: 'Violent showers',
    95: 'Thunderstorm',
    99: 'Hailstorm',
  };

  return weatherMap[code] ?? 'Variable weather';
};

const buildForecastDay = (
  date: string,
  index: number,
  daily: any,
  currentCondition: string
): ForecastDay => ({
  date,
  label: new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }),
  maxTemperature: Number(daily.temperature_2m_max?.[index] ?? 0),
  minTemperature: Number(daily.temperature_2m_min?.[index] ?? 0),
  rainProbability: Number(daily.precipitation_probability_max?.[index] ?? 0),
  precipitation: Number(daily.precipitation_sum?.[index] ?? 0),
  windSpeed: Number(daily.windspeed_10m_max?.[index] ?? 0),
  snowfall: Number(daily.snowfall_sum?.[index] ?? 0),
  weatherCode: Number(daily.weathercode?.[index] ?? 0),
  currentCondition,
});

export const fetchWeatherForecast = async (
  latitude: number,
  longitude: number
): Promise<ForecastSummary> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,windspeed_10m_max,snowfall_sum,weathercode`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch weather forecast.');
  }

  const data = await response.json();
  const current = data.current_weather ?? {};
  const daily = data.daily ?? {};

  const currentCondition = getWeatherDescription(current.weathercode ?? 0);
  const dailyForecasts = Array.isArray(daily.time)
    ? daily.time.map((date: string, index: number) =>
        buildForecastDay(date, index, daily, currentCondition)
      )
    : [];

  return {
    locationName: data.timezone ?? 'UTC',
    timezone: data.timezone ?? 'UTC',
    currentTemp: Number(current.temperature ?? 0),
    currentWind: Number(current.windspeed ?? 0),
    currentCondition,
    daily: dailyForecasts,
  };
};
