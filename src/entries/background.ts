import { db } from '@/db/db';
import { getTodayId } from '@/db/drinks';
import { intervalMs, isReminderDue, formatClock } from '@/utils/time';

// Repeating heartbeat; each tick recomputes whether a reminder is due.
const ALARM_NAME = 'hydration-tick';

// Stable id so a new reminder replaces an unattended one instead of stacking.
const NOTIFICATION_ID = 'hydration-reminder';

// Text prompts for the notification.
const PROMPTS = [
  'Time for a glass of water.',
  'Take a moment to hydrate.',
  'A sip of water can refresh your mind.',
  'Hydration break. Your body will thank you.',
  'Pause for water and keep going.',
  'Stay sharp. Drink some water.',
  'A quick sip can make a difference.',
  'Give yourself a refreshing water break.',
  'Water time. Take a few sips.',
  'Refill your energy with a glass of water.',
  'A healthy habit starts with one sip.',
  'Hydrate now and feel refreshed.',
  'Your next glass of water is waiting.',
  'Small sip, big benefit.',
  'Keep your hydration streak going.',
  'A little water goes a long way.',
  'Take care of yourself. Drink some water.',
  'Refresh, hydrate, and continue your day.',
  'One glass closer to your daily goal.',
  'Step away for a moment and hydrate.',
  "Water break. You've earned it.",
  'Stay refreshed with a few sips of water.',
  'Hydration helps you stay focused.',
  'Take a sip and recharge.',
  'Drink some water and keep doing great work.',
];

/**
 * Recomputes from storage whether a reminder is due and fires one if so.
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

  fireReminder(settings.reminderInterval);
  await db.settings.update('settings', { lastReminderAt: now.getTime() });
}

/**
 * Shows the reminder notification with a freshly computed "Next" time.
 */
function fireReminder(reminderInterval: string): void {
  const message = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
  const next = formatClock(new Date(Date.now() + intervalMs(reminderInterval)));

  browser.notifications.create(NOTIFICATION_ID, {
    type: 'basic',
    iconUrl: '/icons/128.png',
    title: 'Drink Water',
    message,
    priority: 2,
    requireInteraction: false,
    // Buttons are Chromium-only and ignored on Firefox.
    buttons: [{ title: 'Close' }, { title: `Next → ${next}` }],
  });
}

export default defineBackground(() => {
  // Recreating an existing alarm resets it, so this is safe on every startup.
  browser.alarms.create(ALARM_NAME, { periodInMinutes: 1 });

  browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM_NAME) {
      void handleTick();
    }
  });

  browser.notifications.onButtonClicked.addListener((id) => {
    if (id === NOTIFICATION_ID) {
      void browser.notifications.clear(id);
    }
  });

  browser.notifications.onClicked.addListener((id) => {
    if (id === NOTIFICATION_ID) {
      void browser.notifications.clear(id);
    }
  });
});
