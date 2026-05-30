"use client";

import Card from '@/components/shared/Card';

export default function ForecastSkeleton() {
  return (
    <Card>
      <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />
      <div className="mt-6 space-y-3">
        <div className="h-20 rounded-3xl bg-slate-100" />
        <div className="h-20 rounded-3xl bg-slate-100" />
      </div>
    </Card>
  );
}
