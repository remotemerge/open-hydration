import * as vb from 'valibot';
import { AVG_GOAL } from '@/utils/constants';

// Valibot schema for the single settings document persisted in IndexedDB.
const settingsSchema = vb.object({
  id: vb.literal('settings'),

  // Daily goal
  trackingUnit: vb.picklist(['glasses', 'ml']),
  dailyGoal: vb.pipe(vb.number(), vb.integer(), vb.minValue(1), vb.maxValue(16)),

  // Reminder schedule
  reminderInterval: vb.picklist(['15m', '30m', '45m', '60m', '90m', '120m', '180m']),
  activeHoursStart: vb.string(), // "HH:mm"
  activeHoursEnd: vb.string(), // "HH:mm"

  // Reminder delivery
  remindersEnabled: vb.boolean(),
  soundEnabled: vb.boolean(),
  focusTab: vb.boolean(),

  // Scheduler bookkeeping
  lastReminderAt: vb.pipe(vb.number(), vb.integer(), vb.minValue(0)),

  // Appearance
  theme: vb.picklist(['system', 'light', 'dark']),

  // Onboarding
  onboardingComplete: vb.boolean(),
});

export type Settings = vb.InferOutput<typeof settingsSchema>;

// Default settings applied on first run.
export const defaultSettings: Settings = {
  id: 'settings',

  // Daily goal
  trackingUnit: 'glasses',
  dailyGoal: AVG_GOAL,

  // Reminder schedule
  reminderInterval: '30m',
  activeHoursStart: '08:00',
  activeHoursEnd: '22:00',

  // Reminder delivery
  remindersEnabled: true,
  soundEnabled: true,
  focusTab: false,

  // Scheduler bookkeeping
  lastReminderAt: 0,

  // Appearance
  theme: 'system',

  // Onboarding
  onboardingComplete: false,
};
