import { Dexie, type EntityTable } from 'dexie';
import { defaultSettings, type Settings } from './settings';

// IndexedDB store holding the single document
const db = new Dexie('OpenHydration') as Dexie & {
  settings: EntityTable<Settings, 'id'>;
};

// Set the database version and schema
db.version(1).stores({
  settings: 'id',
});

// Seeds default settings once, on initial database creation
db.on('populate', () => {
  db.settings.add(defaultSettings);
});

export { db };
