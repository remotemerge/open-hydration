export interface DrinkDay {
  id: string;
  glasses: number;
  goal?: number; // Frozen per day
}

// The local date in format YYYY-MM-DD.
const dateFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

// Get the ID for a given date.
export const dateIdFor = (date: Date): string => dateFormatter.format(date);

// Get the ID for today's date.
export const getTodayId = (): string => dateIdFor(new Date());
