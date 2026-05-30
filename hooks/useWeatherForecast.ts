"use client";

import { useEffect, useState } from 'react';
import { fetchWeatherForecast } from '@/services/api/weather';
import { ForecastSummary } from '@/types/weather';

const forecastCache = new Map<string, ForecastSummary>();

export const useWeatherForecast = (
  latitude: number | null,
  longitude: number | null
) => {
  const [forecast, setForecast] = useState<ForecastSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (latitude === null || longitude === null) {
      setForecast(null);
      setLoading(false);
      setError('');
      return;
    }

    const cacheKey = `${latitude}:${longitude}`;
    let active = true;

    const fetchForecast = async () => {
      setLoading(true);
      setError('');

      try {
        if (forecastCache.has(cacheKey)) {
          if (active) {
            setForecast(forecastCache.get(cacheKey)!);
          }
          return;
        }

        const data = await fetchWeatherForecast(latitude, longitude);
        forecastCache.set(cacheKey, data);

        if (active) {
          setForecast(data);
        }
      } catch {
        if (active) {
          setError('Unable to load weather forecast. Please try again.');
          setForecast(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchForecast();

    return () => {
      active = false;
    };
  }, [latitude, longitude]);

  return {
    forecast,
    loading,
    error,
    locationName: forecast?.locationName ?? '',
  };
};
