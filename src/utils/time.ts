const MINUTES_PER_HOUR = 60;
const MS_PER_MINUTE = 60_000;

/**
 * Converts an HH:mm time string into minutes since midnight.
 */
function toMinutes(hhmm: string): number {
  const [hours, minutes] = hhmm.split(':');

  return Number(hours) * MINUTES_PER_HOUR + Number(minutes);
}

/**
 * Returns whether the current time falls within the active window.
 */
export function withinActiveHours(now: Date, start: string, end: string): boolean {
  const currentMinutes = now.getHours() * MINUTES_PER_HOUR + now.getMinutes();

  const startMinutes = toMinutes(start);
  const endMinutes = toMinutes(end);

  // Matching bounds mean reminders are active all day.
  if (startMinutes === endMinutes) {
    return true;
  }

  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
}

/**
 * Converts a reminder interval such as "30m" into milliseconds.
 */
export function intervalMs(interval: string): number {
  return Number.parseInt(interval, 10) * MS_PER_MINUTE;
}

/**
 * Formats a local time label using 24-hour time.
 */
export function formatClock(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
