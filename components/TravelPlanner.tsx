"use client";

import { useMemo, useState } from 'react';
import ActivityRanking from '@/components/activities/ActivityRanking';
import CitySearch from '@/components/search/CitySearch';
import Card from '@/components/shared/Card';
import SectionHeader from '@/components/shared/SectionHeader';
import ErrorState from '@/components/shared/ErrorState';
import EmptyState from '@/components/shared/EmptyState';
import ForecastList from '@/components/weather/ForecastList';
import ForecastSkeleton from '@/components/weather/ForecastSkeleton';
import WeatherCard from '@/components/weather/WeatherCard';
import { useWeatherForecast } from '@/hooks/useWeatherForecast';
import { CityOption } from '@/types/city';
import { rankActivities } from '@/lib/activityRanking';

export default function TravelPlanner() {
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const { forecast, loading, error, locationName } = useWeatherForecast(
    selectedCity?.latitude ?? null,
    selectedCity?.longitude ?? null
  );

  const activityRecommendations = useMemo(() => {
    if (!forecast?.daily.length) {
      return [];
    }

    return rankActivities(forecast.daily[0]);
  }, [forecast]);

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.95fr)]">
      <div className="space-y-6">
        <Card>
          <SectionHeader
            title="Search and plan your destination"
            description="Type at least 2 letters to load city suggestions from Open-Meteo."
          />
          <div className="mt-6">
            <CitySearch onSelect={setSelectedCity} />
          </div>
        </Card>

        {error && <ErrorState message={error} />}

        {!selectedCity && !error && (
          <EmptyState
            title="Pick a destination"
            description="Search for a city to view a weather forecast and activity recommendations."
          />
        )}

        {selectedCity && (
          <div className="space-y-6">
            {loading && <ForecastSkeleton />}

            {!loading && forecast && (
              <>
                <WeatherCard
                  city={selectedCity}
                  locationName={locationName}
                  currentTemp={forecast.currentTemp}
                  currentWind={forecast.currentWind}
                  currentCondition={forecast.currentCondition}
                  summary={forecast.daily[0]}
                />

                <ForecastList forecasts={forecast.daily} />
              </>
            )}
          </div>
        )}
      </div>

      <aside className="space-y-6">
        <Card>
          <SectionHeader
            title="Activity recommendations"
            description="Ranked suggestions based on temperature, wind, rain, and snowfall."
            headingLevel="h3"
          />
          <div className="mt-6">
            <ActivityRanking activities={activityRecommendations} />
          </div>
        </Card>

        <Card>
          <SectionHeader title="How this works" headingLevel="h3" />
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>• City suggestions are fetched from the Open-Meteo geocoding API.</li>
            <li>• The forecast is loaded from Open-Meteo weather data.</li>
            <li>• Activities are ranked from the weather summary for the selected city.</li>
          </ul>
        </Card>
      </aside>
    </section>
  );
}
