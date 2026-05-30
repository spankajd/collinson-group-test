"use client";

import ActivityBadge from '@/components/activities/ActivityBadge';

interface ActivityRankingProps {
  activities: string[];
}

export default function ActivityRanking({ activities }: ActivityRankingProps) {
  if (!activities.length) {
    return (
      <p className="text-sm leading-6 text-slate-600">
        No strong activity recommendations yet. Search for a city to load forecast-based suggestions.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {activities.map((activity) => (
        <ActivityBadge key={activity} label={activity} />
      ))}
    </div>
  );
}
