"use client";

import Card from '@/components/shared/Card';
import SectionHeader from '@/components/shared/SectionHeader';
import StatBox from '@/components/shared/StatBox';
import { CityOption } from '@/types/city';
import { ForecastDay } from '@/types/weather';

interface WeatherCardProps {
  city: CityOption;
  locationName: string;
  currentTemp: number;
  currentWind: number;
  currentCondition: string;
  summary: ForecastDay;
}

export default function WeatherCard({
  city,
  locationName,
  currentTemp,
  currentWind,
  currentCondition,
  summary,
}: WeatherCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeader
          badge="Current forecast"
          title={`${city.name}, ${city.country}`}
          description={locationName}
          headingLevel="h2"
        />
        <div className="rounded-3xl bg-slate-50 px-5 py-4 text-center">
          <p className="text-sm text-slate-500">Now</p>
          <p className="mt-2 text-4xl font-semibold text-slate-900">{Math.round(currentTemp)}°C</p>
          <p className="mt-1 text-sm text-slate-600">{currentCondition}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatBox label="High / Low" value={`${Math.round(summary.maxTemperature)}° / ${Math.round(summary.minTemperature)}°`} />
        <StatBox label="Rain chance" value={`${summary.rainProbability}%`} />
        <StatBox label="Wind" value={`${Math.round(summary.windSpeed)} km/h`} />
      </div>
    </Card>
  );
}
