import type { Settings } from '@/db/settings';

/**
 * Minutes since local midnight for a "HH:mm" string.
 */
function toMinutes(hhmm: string): number {
  const [hours, minutes] = hhmm.split(':');
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
}

/**
 * Whether `now` is within the `[start, end)` active-hours window.
 */
export function withinActiveHours(now: Date, start: string, end: string): boolean {
  const current = now.getHours() * 60 + now.getMinutes();
  const startMin = toMinutes(start);
  const endMin = toMinutes(end);

  // Equal bounds mean an always-active window rather than a zero-width one.
  if (startMin === endMin) {
    return true;
  }

  if (startMin < endMin) {
    return current >= startMin && current < endMin;
  }

  // Overnight window (e.g. 22:00–06:00) wraps past midnight.
  return current >= startMin || current < endMin;
}

/**
 * Milliseconds for a reminder interval such as "30m".
 */
export function intervalMs(interval: string): number {
  return parseInt(interval, 10) * 60_000;
}

/**
 * Local clock label, e.g. "12:35 PM".
 */
export function formatClock(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

/**
 * Whether the interval has elapsed since the last reminder; 0 means never, so due.
 */
export function isIntervalElapsed(now: number, lastReminderAt: number, interval: string): boolean {
  if (lastReminderAt === 0) {
    return true;
  }
  return now - lastReminderAt >= intervalMs(interval);
}

/**
 * Whether a reminder should fire now: enabled, in active hours, goal unmet, interval elapsed.
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

  return isIntervalElapsed(now.getTime(), settings.lastReminderAt, settings.reminderInterval);
}
