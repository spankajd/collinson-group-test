# Weather Planner

A small travel planning frontend built with Next.js, TypeScript and Tailwind CSS. Users can search cities using Open-Meteo Geocoding, load a forecast from Open-Meteo, and receive ranked activity recommendations based on weather conditions.

## Architecture

- `app/` contains the main page and layout.
- `components/` contains reusable UI components, including search, forecast display and activity ranking.
- `hooks/` contains custom data hooks and client-side caching logic.
- `services/api/` contains API integration with Open-Meteo.
- `types/` contains shared TypeScript interfaces.
- `lib/` contains business logic for ranking activities.

## How to run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## How to run tests

```bash
npm test
```

## Assumptions

- The app uses Open-Meteo endpoints directly from the browser.
- City suggestions are only fetched once the query contains at least 2 characters.
- Forecast ranking is based on the first day of the returned daily forecast.

## Improvements with more time

- Add GraphQL abstraction layer or Apollo integration.
- Introduce React Query / TanStack Query for richer caching and request state management.
- Add additional forecast detail cards and hourly visualization.
- Improve accessibility further with ARIA live regions and keyboard navigation refinements.
