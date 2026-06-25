import { useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db/db';
import { defaultSettings, type Settings } from '@/db/settings';

/**
 * Subscribes to the settings document via Dexie's live query.
 * Returns `undefined` while loading and the `Settings` object once available.
 *
 * @returns {Settings | undefined} The settings document, or `undefined` while loading.
 */
export function useSettings() {
  return useLiveQuery(() => db.settings.get('settings'));
}

// Listeners notified after each explicit settings write.
const saveListeners = new Set<() => void>();

/**
 * Persists a partial settings change and notifies all save listeners.
 *
 * @param {Partial<Omit<Settings, 'id'>>} changes - Partial settings object (excluding `id`) to merge into the current document.
 * @returns {Promise<void>} Resolves once the change is persisted and listeners are notified.
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
 *
 * @returns {Promise<void>} Resolves once the settings have been reset.
 */
export async function resetSettings(): Promise<void> {
  const current = await db.settings.get('settings');
  await db.settings.put({
    ...defaultSettings,
    onboardingComplete: current?.onboardingComplete ?? defaultSettings.onboardingComplete,
  });
}

/**
 * Runs a callback after every explicit settings save.
 * Useful for triggering toast notifications or other UI feedback.
 *
 * @param {() => void} callback - Function to invoke after each save.
 * @returns {void}
 */
export function useOnSettingsSaved(callback: () => void): void {
  useEffect(() => {
    saveListeners.add(callback);
    return () => {
      saveListeners.delete(callback);
    };
  }, [callback]);
}
