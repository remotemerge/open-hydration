import { Dexie, type EntityTable } from 'dexie';
import { defaultSettings, type Settings } from './settings';
import type { DrinkDay } from './drinks';

interface Meta {
  key: string;
  value: unknown;
}

// IndexedDB instance holding settings, daily drink logs, and app state.
const db = new Dexie('oh-db') as Dexie & {
  settings: EntityTable<Settings, 'id'>;
  drinks: EntityTable<DrinkDay, 'id'>;
  meta: EntityTable<Meta, 'key'>;
};

// Define the database schema for version 1.
db.version(1).stores({
  settings: 'id',
  drinks: 'id',
});

// Define the database schema for version 2.
db.version(2).stores({
  settings: 'id',
  drinks: 'id',
  meta: 'key',
});

// Seed default settings on first database creation only.
// Dexie fires `populate` once when the DB is created, never on version upgrades.
db.on('populate', () => {
  db.settings.add(defaultSettings);
});

export { db };
