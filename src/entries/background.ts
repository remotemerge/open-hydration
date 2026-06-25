import { db } from '@/db/db';
import { getTodayId, isReminderDue } from '@/utils/time';
import { openReminderTab, forgetReminderTab } from '@/utils/reminder';

const ALARM_NAME = 'oh-tick';
const ALARM_INTERVAL_MINUTES = 1;
const MS_PER_MINUTE = 60_000;

/**
 * Opens a hydration reminder when the current clock-aligned slot is due.
 * Reads settings and today's drink record, then delegates to `isReminderDue`.
 *
 * @returns {Promise<void>} Resolves once the tick has been processed.
 */
async function handleTick(): Promise<void> {
  const settings = await db.settings.get('settings');

  if (!settings) {
    return;
  }

  const now = new Date();
  const today = await db.drinks.get(getTodayId());

  const glasses = today?.glasses ?? 0;
  const goal = today?.goal ?? settings.dailyGoal;

  if (!isReminderDue(settings, now, glasses, goal)) {
    return;
  }

  try {
    await openReminderTab(settings.focusTab);
  } catch {
    // Tab creation failed; leave lastReminderAt unchanged so the same aligned
    // slot is retried on the next tick instead of being skipped.
    return;
  }

  // Record the reminder timestamp only after the tab opens successfully.
  await db.settings.update('settings', {
    lastReminderAt: now.getTime(),
  });
}

/**
 * Handles periodic hydration checks triggered by the service worker alarm.
 * Ignores alarms that do not match the expected name.
 *
 * @param {Browser.alarms.Alarm} alarm - The alarm that fired.
 * @returns {void}
 */
function handleAlarm(alarm: Browser.alarms.Alarm): void {
  if (alarm.name !== ALARM_NAME) {
    return;
  }

  void handleTick();
}

export default defineBackground(() => {
  // Align the first alarm to the next minute boundary so ticks stay synchronized
  // with clock-aligned reminder slots.
  const nextMinute = Math.ceil(Date.now() / MS_PER_MINUTE) * MS_PER_MINUTE;

  browser.alarms.create(ALARM_NAME, {
    when: nextMinute,
    periodInMinutes: ALARM_INTERVAL_MINUTES,
  });
  browser.alarms.onAlarm.addListener(handleAlarm);

  // Clean up the cached reminder tab reference when the tab is closed.
  browser.tabs.onRemoved.addListener((tabId) => {
    forgetReminderTab(tabId);
  });
});
