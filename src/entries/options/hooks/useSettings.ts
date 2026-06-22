import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db/db';

// Subscribe to the settings document
export function useSettings() {
  return useLiveQuery(() => db.settings.get('settings'));
}
