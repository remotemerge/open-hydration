import type { Settings } from '@/db/settings';

const MINUTES_PER_HOUR = 60;
const MS_PER_MINUTE = 60_000;

// Local date formatter producing YYYY-MM-DD strings via the en-CA locale.
const dateFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/**
 * Returns the local-time YYYY-MM-DD identifier used as the per-day storage key.
 * Day boundaries follow the browser's time zone, not UTC.
 *
 * @param {Date} date - The date to convert into a day identifier.
 * @returns {string} The YYYY-MM-DD identifier for the given date.
 */
export const dateIdFor = (date: Date): string => dateFormatter.format(date);

/**
 * Returns the YYYY-MM-DD identifier for the current local day.
 *
 * @returns {string} The YYYY-MM-DD identifier for today.
 */
export const getTodayId = (): string => dateIdFor(new Date());

/**
 * Formats a date as a local time label (e.g., "2:30 PM").
 * Uses en-US locale for consistent 12-hour formatting across browsers.
 *
 * @param {Date} date - The date whose time component is formatted.
 * @returns {string} The localized 12-hour time label.
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Converts an "HH:mm" time string into minutes since midnight.
 *
 * @param {string} hourMinute - Time string in 24-hour "HH:mm" format.
 * @returns {number} Minutes elapsed since midnight.
 */
function toMinutes(hourMinute: string): number {
  const [hours, minutes] = hourMinute.split(':');

  return Number(hours) * MINUTES_PER_HOUR + Number(minutes);
}

/**
 * Returns whether the current time falls within the active hours window.
 * The end time is exclusive, so an inverted or equal range is never active.
 *
 * @param {Date} now - The current time to test against the window.
 * @param {string} start - Start of active window in "HH:mm" format.
 * @param {string} end - End of active window in "HH:mm" format (exclusive).
 * @returns {boolean} True when `now` is within the active hours window.
 */
export function withinActiveHours(now: Date, start: string, end: string): boolean {
  const currentMinutes = now.getHours() * MINUTES_PER_HOUR + now.getMinutes();

  const startMinutes = toMinutes(start);
  const endMinutes = toMinutes(end);

  // End is exclusive, so an equal or inverted range is never active.
  // This prevents the edge case where start and end are identical.
  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
}

/**
 * Returns the start of the clock-aligned slot containing `now`, anchored at midnight.
 * This alignment ensures reminders fire at consistent intervals from midnight,
 * preventing drift that would occur if intervals were relative to the previous alarm.
 *
 * @param {Date} now - The reference time whose containing slot is computed.
 * @param {number} intervalMinutes - Reminder interval in minutes (e.g., 15, 30, 60).
 * @returns {number} Epoch milliseconds at the start of the containing slot.
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
 *
 * @param {Date} now - The reference time the next fire time follows.
 * @param {number} intervalMinutes - Reminder interval in minutes (e.g., 15, 30, 60).
 * @returns {number} Epoch milliseconds of the next aligned reminder.
 */
export function nextAlignedFireTime(now: Date, intervalMinutes: number): number {
  return alignedSlotStart(now, intervalMinutes) + intervalMinutes * MS_PER_MINUTE;
}

/**
 * Returns whether a reminder is due, given the current settings, time, and daily progress.
 * A reminder is due when reminders are enabled, we are within active hours, the daily goal
 * has not been reached, and the last reminder predates the current clock-aligned slot.
 *
 * @param {Settings} settings - The persisted reminder configuration.
 * @param {Date} now - The current time used to evaluate the active window and slot.
 * @param {number} glasses - Number of glasses consumed today.
 * @param {number} goal - Daily hydration goal in glasses.
 * @returns {boolean} True when a reminder should fire for the current slot.
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

  // Due once the last reminder predates the current clock-aligned slot.
  return settings.lastReminderAt < alignedSlotStart(now, intervalMinutes);
}
