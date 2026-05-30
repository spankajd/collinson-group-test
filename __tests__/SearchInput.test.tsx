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
    jest.useFakeTimers();
    const user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
  });

  const fetchOptions = jest.fn().mockResolvedValue([
    { id: 1, label: "Berlin" },
    { id: 2, label: "Berkeley" },
  ]);

  render(
    <SearchComponent
      fetchOptions={fetchOptions}
      onSelect={jest.fn()}
    />
  );

  const input = screen.getByPlaceholderText("Search...");

  await user.type(input, "Ber");

  await act(async () => {
    jest.runAllTimers();
  });

  expect(await screen.findByText("Berlin"))
    .toBeInTheDocument();

  expect(fetchOptions).toHaveBeenCalledWith("Ber");
  });
});
