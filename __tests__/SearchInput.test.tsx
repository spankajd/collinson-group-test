import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchComponent, SearchResult } from '@/components/search/SearchInput';

describe('SearchComponent', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('loads and displays suggestions after user input', async () => {
    const fetchOptions = jest.fn(async (query: string) => [
      { id: 1, label: 'Berlin' },
      { id: 2, label: 'Berkeley' },
    ]);

    const handleSelect = jest.fn();

    render(<SearchComponent fetchOptions={fetchOptions} onSelect={handleSelect} />);
    const input = screen.getByPlaceholderText('Search...');

    await userEvent.type(input, 'Ber');
    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(await screen.findByText('Berlin')).toBeInTheDocument();
    expect(fetchOptions).toHaveBeenCalledWith('Ber');
  });
});
