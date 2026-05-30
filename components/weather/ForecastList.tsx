"use client";

import Card from '@/components/shared/Card';
import SectionHeader from '@/components/shared/SectionHeader';
import StatBox from '@/components/shared/StatBox';
import { ForecastDay } from '@/types/weather';

interface ForecastListProps {
  forecasts: ForecastDay[];
}

export default function ForecastList({ forecasts }: ForecastListProps) {
  return (
    <Card>
      <SectionHeader
        title="5-day forecast"
        description="Weather summary for the next few days."
        headingLevel="h3"
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {forecasts.map((forecast) => (
          <article key={forecast.date} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">{forecast.label}</p>
            <p className="mt-2 text-sm text-slate-600">{forecast.currentCondition ?? 'Forecast summary'}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700">
              <StatBox label="High" value={`${Math.round(forecast.maxTemperature)}°`} />
              <StatBox label="Low" value={`${Math.round(forecast.minTemperature)}°`} />
              <StatBox label="Rain" value={`${forecast.rainProbability}%`} />
              <StatBox label="Wind" value={`${Math.round(forecast.windSpeed)} km/h`} />
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}
