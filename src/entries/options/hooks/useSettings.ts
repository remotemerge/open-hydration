import { useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db/db';
import type { Settings } from '@/db/settings';

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
export function updateSettings(changes: Partial<Omit<Settings, 'id'>>): void {
  db.settings.update('settings', changes);
  saveListeners.forEach((listener) => listener());
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
