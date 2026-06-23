import * as vb from 'valibot';

// Schema for the single settings document persisted in IndexedDB.
export const settingsSchema = vb.object({
  id: vb.literal('settings'),

  // Daily Goal
  goalType: vb.picklist(['glasses', 'ml']),
  dailyGoal: vb.pipe(vb.number(), vb.integer(), vb.minValue(1), vb.maxValue(16)),

  // Reminder
  reminderInterval: vb.picklist(['15m', '20m', '30m', '45m', '60m', '120m', '240m']),
  activeHoursStart: vb.string(), // "HH:mm"
  activeHoursEnd: vb.string(), // "HH:mm"

  // Notifications
  remindersEnabled: vb.boolean(),
  soundEnabled: vb.boolean(),

  // Appearance
  theme: vb.picklist(['system', 'light', 'dark']),

  // Onboarding
  onboardingComplete: vb.boolean(),
});

export type Settings = vb.InferOutput<typeof settingsSchema>;

// Defaults applied on first run.
export const defaultSettings: Settings = {
  id: 'settings',

  // Daily Goal
  goalType: 'glasses',
  dailyGoal: 8,

  // Reminder
  reminderInterval: '30m',
  activeHoursStart: '08:00',
  activeHoursEnd: '22:00',

  // Notifications
  remindersEnabled: true,
  soundEnabled: false,

  // Appearance
  theme: 'light',

  // Onboarding
  onboardingComplete: false,
};
