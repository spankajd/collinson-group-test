import { rankActivities } from '@/lib/activityRanking';

describe('rankActivities', () => {
  it('recommends skiing for high snowfall', () => {
    const forecast = {
      date: '2026-01-01',
      label: 'Fri, Jan 1',
      maxTemperature: 0,
      minTemperature: -5,
      rainProbability: 10,
      precipitation: 0,
      windSpeed: 5,
      snowfall: 25,
      weatherCode: 71,
    };

    expect(rankActivities(forecast)).toContain('Skiing');
  });

  it('recommends outdoor sightseeing when warm and dry', () => {
    const forecast = {
      date: '2026-06-01',
      label: 'Mon, Jun 1',
      maxTemperature: 25,
      minTemperature: 15,
      rainProbability: 10,
      precipitation: 0,
      windSpeed: 5,
      snowfall: 0,
      weatherCode: 1,
    };

    expect(rankActivities(forecast)).toContain('Outdoor sightseeing');
  });
});
