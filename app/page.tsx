import TravelPlanner from '@/components/TravelPlanner';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600">Travel planner</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Weather-driven activity recommendations</h1>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Search cities, inspect the forecast from Open-Meteo and receive ranked activity suggestions for your next trip.
          </p>
        </div>
        <TravelPlanner />
      </div>
    </main>
  );
}
