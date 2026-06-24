import { db } from '@/db/db';
import { getTodayId } from '@/db/drinks';
import { isReminderDue } from '@/utils/time';
import { openReminderTab, forgetReminderTab } from '@/utils/reminder';

const ALARM_NAME = 'oh-tick';
const ALARM_INTERVAL_MINUTES = 1;

/**
 * Opens a hydration reminder when the configured interval has elapsed.
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
  // Replacing an existing alarm resets its schedule.
  browser.alarms.create(ALARM_NAME, {
    periodInMinutes: ALARM_INTERVAL_MINUTES,
  });

  browser.alarms.onAlarm.addListener(handleAlarm);

  // Clear cached reminder tab references when a tab closes.
  browser.tabs.onRemoved.addListener((tabId) => {
    forgetReminderTab(tabId);
  });
});
