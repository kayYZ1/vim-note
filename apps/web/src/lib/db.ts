import Dexie, { type EntityTable } from 'dexie';

import { Note, Folder, Image } from './interfaces.ts';

const db = new Dexie('VimNoteInMemoryDb') as Dexie & {
	notes: EntityTable<
		Note,
		'id' // primary key "id" (for the typings only)
	>;
	folders: EntityTable<Folder, 'id'>;
	images: EntityTable<Image, 'id'>;
};

// Schema declaration:
db.version(1).stores({
	notes: 'id, date, title, description, content',
	folders: 'id, name, notes',
	images: '++id, name, src',
});

export { db };
