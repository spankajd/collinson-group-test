"use client";

interface StatBoxProps {
  label: string;
  value: string | number;
}

export default function StatBox({ label, value }: StatBoxProps) {
  return (
    <div className="rounded-2xl bg-white p-3">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}
