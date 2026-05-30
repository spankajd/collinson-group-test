"use client";

interface ActivityBadgeProps {
  label: string;
}

export default function ActivityBadge({ label }: ActivityBadgeProps) {
  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
      {label}
    </div>
  );
}
