export interface DrinkDay {
  id: string;
  glasses: number;
}

/**
 * Get the current date in YYYY-MM-DD format
 */
const dateFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export const getTodayId = (): string => dateFormatter.format(new Date());
