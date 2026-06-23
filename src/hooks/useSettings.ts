import { useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db/db';
import { defaultSettings, type Settings } from '@/db/settings';

/**
 * Live-subscribe to the settings document
 */
export function useSettings() {
  return useLiveQuery(() => db.settings.get('settings'));
}

// Subscribers notified after each explicit setting writes
const saveListeners = new Set<() => void>();

/**
 * Persist a settings change and signal an explicit save
 */
export async function updateSettings(changes: Partial<Omit<Settings, 'id'>>): Promise<void> {
  await db.settings.update('settings', changes);
  saveListeners.forEach((listener) => listener());
}

/**
 * Restore every setting to its default value.
 *
 * Preserves onboarding completion, so resetting from the `options` page never
 * forces the popup back into its first-launch flow.
 */
export async function resetSettings(): Promise<void> {
  const current = await db.settings.get('settings');
  await db.settings.put({
    ...defaultSettings,
    onboardingComplete: current?.onboardingComplete ?? defaultSettings.onboardingComplete,
  });
}

/**
 * Run the callback after every explicit settings save
 */
export function useOnSettingsSaved(callback: () => void): void {
  useEffect(() => {
    saveListeners.add(callback);
    return () => {
      saveListeners.delete(callback);
    };
  }, [callback]);
}
