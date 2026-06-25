import type { Settings } from '@/db/settings';

const MINUTES_PER_HOUR = 60;
const MS_PER_MINUTE = 60_000;

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

/**
 * Formats a date as a local time label (e.g., "2:30 PM").
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Converts an HH:mm time string into minutes since midnight.
 */
function toMinutes(hourMinute: string): number {
  const [hours, minutes] = hourMinute.split(':');

  return Number(hours) * MINUTES_PER_HOUR + Number(minutes);
}

/**
 * Returns whether the current time falls within the active window.
 */
export function withinActiveHours(now: Date, start: string, end: string): boolean {
  const currentMinutes = now.getHours() * MINUTES_PER_HOUR + now.getMinutes();

  const startMinutes = toMinutes(start);
  const endMinutes = toMinutes(end);

  // End is exclusive, so an equal or inverted range is never active.
  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
}

/**
 * Converts a reminder interval such as "30m" into milliseconds.
 */
export function intervalMs(interval: string): number {
  return Number.parseInt(interval, 10) * MS_PER_MINUTE;
}

/**
 * Returns the start of the clock-aligned slot containing `now`, anchored at midnight.
 */
function alignedSlotStart(now: Date, intervalMinutes: number): number {
  const totalMinutes = now.getHours() * MINUTES_PER_HOUR + now.getMinutes();
  const slotStartMinutes = Math.floor(totalMinutes / intervalMinutes) * intervalMinutes;

  const midnight = new Date(now);
  midnight.setHours(0, 0, 0, 0);

  return midnight.getTime() + slotStartMinutes * MS_PER_MINUTE;
}

/**
 * Returns the timestamp of the next clock-aligned reminder after `now`.
 */
export function nextAlignedFireTime(now: Date, intervalMinutes: number): number {
  return alignedSlotStart(now, intervalMinutes) + intervalMinutes * MS_PER_MINUTE;
}

/**
 * Returns whether a reminder is due, given settings, time, and daily progress.
 */
export function isReminderDue(settings: Settings, now: Date, glasses: number, goal: number): boolean {
  if (!settings.remindersEnabled) {
    return false;
  }

  if (!withinActiveHours(now, settings.activeHoursStart, settings.activeHoursEnd)) {
    return false;
  }

  if (glasses >= goal) {
    return false;
  }

  const intervalMinutes = Number.parseInt(settings.reminderInterval, 10);

  // Due once the last reminder predates the current slot.
  return settings.lastReminderAt < alignedSlotStart(now, intervalMinutes);
}
