"use client";

import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';

export interface SearchResult {
  id: string | number;
  label: string;
}

interface GenericSearchProps<T extends SearchResult> {
  placeholder?: string;
  minSearchLength?: number;
  debounceMs?: number;
  fetchOptions: (query: string) => Promise<T[]>;
  onSelect: (item: T) => void;
  renderOption?: (item: T) => React.ReactNode;
}

export function SearchComponent<T extends SearchResult>({
  placeholder = 'Search...',
  minSearchLength = 2,
  debounceMs = 400,
  fetchOptions,
  onSelect,
  renderOption,
}: GenericSearchProps<T>) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < minSearchLength) {
      setResults([]);
      setShowDropdown(false);
      setError('');
      return;
    }

    const currentQuery = query.trim();
    const timeout = window.setTimeout(async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchOptions(currentQuery);
        setResults(data);
        setShowDropdown(true);
      } catch {
        setError('Failed to load results.');
        setResults([]);
        setShowDropdown(true);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => window.clearTimeout(timeout);
  }, [query, debounceMs, minSearchLength, fetchOptions]);

  useEffect(() => {
    setHighlightedIndex(results.length > 0 ? 0 : -1);
  }, [results]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: T) => {
    setQuery(item.label);
    setShowDropdown(false);
    onSelect(item);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex((prev) => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        if (highlightedIndex >= 0 && results[highlightedIndex]) {
          handleSelect(results[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full" role="combobox" aria-expanded={showDropdown}>
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          if (results.length) {
            setShowDropdown(true);
          }
        }}
        onKeyDown={handleKeyDown}
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        aria-autocomplete="list"
        aria-controls="search-results"
      />

      {loading && (
        <div className="pointer-events-none absolute right-4 top-3 text-xs font-medium text-slate-500">
          Searching...
        </div>
      )}

      {showDropdown && (
        <div className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-2xl border border-slate-200 bg-white shadow-lg">
          {error ? (
            <div className="p-3 text-sm text-red-600">{error}</div>
          ) : results.length === 0 ? (
            <div className="p-3 text-sm text-slate-500">No results found.</div>
          ) : (
            <div id="search-results" role="listbox">
              {results.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left text-sm transition hover:bg-slate-50 ${
                    highlightedIndex === index ? 'bg-slate-100' : ''
                  }`}
                  role="option"
                  aria-selected={highlightedIndex === index}
                >
                  {renderOption ? renderOption(item) : item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
