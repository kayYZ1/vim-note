import Dexie, { type EntityTable } from "dexie";

import { Note, Folder } from "./interfaces.ts";

const db = new Dexie("VimNoteInMemoryDb") as Dexie & {
  notes: EntityTable<
    Note,
    "id" // primary key "id" (for the typings only)
  >;
  folders: EntityTable<Folder, "id">;
};

// Schema declaration:
db.version(1).stores({
  notes: "id, date, title, description, content",
  folders: "id, name, notes",
});

export { db };
