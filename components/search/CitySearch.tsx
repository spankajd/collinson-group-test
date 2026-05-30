"use client";

import { SearchComponent, SearchResult } from '@/components/search/SearchInput';
import { useCitySearch } from '@/hooks/useCitySearch';
import { CityOption } from '@/types/city';

interface CitySearchResult extends Omit<CityOption, 'id'>, SearchResult {
  id: string | number;
}

interface CitySearchProps {
  onSelect: (city: CityOption) => void;
}

export default function CitySearch({ onSelect }: CitySearchProps) {
  const fetchCities = async (query: string): Promise<CitySearchResult[]> => {
    const cities = await useCitySearch(query);

    return cities.map((city) => ({
      id: city.id,
      label: `${city.name}, ${city.country}`,
      name: city.name,
      country: city.country,
      admin1: city.admin1,
      latitude: city.latitude,
      longitude: city.longitude,
    }));
  };

  return (
    <SearchComponent
      placeholder="Search city..."
      fetchOptions={fetchCities}
      onSelect={(city) =>
        onSelect({
          id: Number(city.id),
          name: city.name,
          country: city.country,
          admin1: city.admin1,
          latitude: city.latitude,
          longitude: city.longitude,
        })
      }
      renderOption={(item) => (
        <div className="space-y-0.5">
          <p className="font-medium text-slate-900">{item.label}</p>
          <p className="text-xs text-slate-500">{item.admin1 ?? item.country}</p>
        </div>
      )}
    />
  );
}
