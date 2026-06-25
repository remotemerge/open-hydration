import { db } from '@/db/db';
import { getTodayId, isReminderDue } from '@/utils/time';
import { openReminderTab, forgetReminderTab } from '@/utils/reminder';

const ALARM_NAME = 'oh-tick';
const ALARM_INTERVAL_MINUTES = 1;
const MS_PER_MINUTE = 60_000;

/**
 * Opens a hydration reminder when the current clock slot is due.
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
    await openReminderTab();
  } catch {
    // Retry on the next tick if tab creation fails.
    return;
  }

  // Only record the reminder after successful open.
  await db.settings.update('settings', {
    lastReminderAt: now.getTime(),
  });
}

/**
 * Handles periodic hydration checks triggered by the alarm.
 */
function handleAlarm(alarm: Browser.alarms.Alarm): void {
  if (alarm.name !== ALARM_NAME) {
    return;
  }

  void handleTick();
}

export default defineBackground(() => {
  // Start on the next minute boundary to keep ticks aligned.
  const nextMinute = Math.ceil(Date.now() / MS_PER_MINUTE) * MS_PER_MINUTE;

  browser.alarms.create(ALARM_NAME, {
    when: nextMinute,
    periodInMinutes: ALARM_INTERVAL_MINUTES,
  });
  browser.alarms.onAlarm.addListener(handleAlarm);

  // Clear cached reminder tab references when a tab closes.
  browser.tabs.onRemoved.addListener((tabId) => {
    forgetReminderTab(tabId);
  });
});
