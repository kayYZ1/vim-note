import { useLiveQuery } from "dexie-react-hooks";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { db } from "@/lib/db";
import PrimaryMenu from "./components/primary-menu";
import SecondaryMenu from "./components/secondary-menu";
import DraggableNote from "./components/draggable-note";
import DroppableArea from "./components/droppable-area";

export default function Notes() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const folders = useLiveQuery(() => db.folders.toArray());
  const notes = useLiveQuery(() => db.notes.toArray());

  if (!folders || !notes) return;

  const folderNoteIds = new Set(
    folders.flatMap((folder) => folder.notes.map((note) => note.id)),
  );
  const singleNotes = notes.filter((note) => !folderNoteIds.has(note.id));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const noteId = active.id as string;
    const targetFolderId = over.id as string;

    const sourceFolder = await db.folders
      .filter(folder => folder.notes.some(note => note.id === noteId))
      .first();
    if (sourceFolder) {
      sourceFolder.notes = sourceFolder.notes.filter((note) => note.id !== noteId);
      console.log("Removing note from ", sourceFolder.name)
      await db.folders.put(sourceFolder);
    }

    if (targetFolderId !== "root") {
      const targetFolder = await db.folders.get(targetFolderId);
      if (!targetFolder) return;

      const note = await db.notes.get(noteId);
      if (!note) return;

      targetFolder.notes.push(note);
      console.log("Moving ", noteId, " to target ", targetFolder.name);
      await db.folders.put(targetFolder);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <nav className="flex flex-col space-y-4 mt-6 flex-1">
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2 text-sm text-muted-foreground">
            <span>Notes</span>
            <PrimaryMenu />
          </div>
          <Accordion type="multiple" className="space-y-1">
            {folders.map((folder) => (
              <AccordionItem
                value={folder.name}
                key={folder.id}
                className="border-0"
              >
                <AccordionTrigger className="px-2 text-sm">
                  <SecondaryMenu {...folder} />
                </AccordionTrigger>
                <AccordionContent className="relative px-4 before:absolute before:left-3.5 before:top-0 before:bottom-0 before:w-[2px] before:bg-gray-400 before:opacity-10">
                  <DroppableArea id={folder.id}>
                    {folder.notes.length !== 0 ? folder.notes.map((note) => (
                      <DraggableNote key={note.id} note={note} />
                    )) : <p className="px-4 py-2">No notes</p>}
                  </DroppableArea>
                </AccordionContent>
              </AccordionItem>
            ))}
            <DroppableArea id="root">
              {singleNotes.map((note) => (
                <DraggableNote key={note.id} note={note} />
              ))}
            </DroppableArea>
          </Accordion>
        </div>
      </nav>
    </DndContext>
  );
}
