import { Dexie, type EntityTable } from 'dexie';
import { defaultSettings, type Settings } from './settings';

// Single-table store keyed by 'id'.
const db = new Dexie('OpenHydration') as Dexie & {
  settings: EntityTable<Settings, 'id'>;
};

db.version(1).stores({
  settings: 'id',
});

export { db };

// Seeds default settings on first run.
export async function ensureSettings(): Promise<void> {
  const existing = await db.settings.get('settings');
  if (!existing) {
    await db.settings.add(defaultSettings);
  }
}
