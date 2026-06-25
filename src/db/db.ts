import { Dexie, type EntityTable } from 'dexie';
import { defaultSettings, type Settings } from './settings';
import type { DrinkDay } from './drinks';

// IndexedDB instance holding settings and daily drink logs.
const db = new Dexie('oh-db') as Dexie & {
  settings: EntityTable<Settings, 'id'>;
  drinks: EntityTable<DrinkDay, 'id'>;
};

// Define the database version and schema.
db.version(1).stores({
  settings: 'id',
  drinks: 'id',
});

// Seed default settings on first database creation only.
// Dexie fires `populate` once when the DB is created, never on version upgrades.
db.on('populate', () => {
  db.settings.add(defaultSettings);
});

export { db };
