"use client";

import Card from '@/components/shared/Card';

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm">
      <p className="font-semibold">Something went wrong</p>
      <p className="mt-2">{message}</p>
    </div>
  );
}
