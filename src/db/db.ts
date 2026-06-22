import { Dexie, type EntityTable } from 'dexie';
import { defaultSettings, type Settings } from './settings';
import type { DrinkDay } from './drinks';

// IndexedDB store holding settings and daily drink logs
const db = new Dexie('OpenHydration') as Dexie & {
  settings: EntityTable<Settings, 'id'>;
  drinks: EntityTable<DrinkDay, 'id'>;
};

// Set the database version and schema
db.version(1).stores({
  settings: 'id',
  drinks: 'id',
});

// Seeds default settings once, on initial database creation
db.on('populate', () => {
  db.settings.add(defaultSettings);
});

export { db };
