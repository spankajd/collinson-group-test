export interface ForecastDay {
  date: string;
  label: string;
  maxTemperature: number;
  minTemperature: number;
  rainProbability: number;
  precipitation: number;
  windSpeed: number;
  snowfall: number;
  weatherCode: number;
  currentCondition?: string;
}

export interface ForecastSummary {
  locationName: string;
  timezone: string;
  currentTemp: number;
  currentWind: number;
  currentCondition: string;
  daily: ForecastDay[];
}
