import { Bookmark, RefreshCw, StickyNote } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { db } from "@/lib/db";
import PrimaryMenu from "./primary-menu";
import SecondaryMenu from "./secondary-menu";

export default function Notes() {
  const navigate = useNavigate();

  const folders = useLiveQuery(() => db.folders.toArray());
  const notes = useLiveQuery(() => db.notes.toArray());

  const singleNotes = useLiveQuery(() => {
    if (!folders || !notes) return [];

    const folderNoteIds = new Set(
      folders.flatMap(folder => folder.notes.map(note => note.id))
    );

    return notes.filter(note => !folderNoteIds.has(note.id));
  }, [folders, notes]);

  return (
    <nav className="flex flex-col space-y-4 mt-6 flex-1">
      {/* Folders section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2 text-sm text-muted-foreground">
          <span>Notes</span>
          <PrimaryMenu />
        </div>
        {/* Folders and notes */}
        <Accordion type="multiple" className="space-y-1">
          {folders?.map((folder) => (
            <AccordionItem
              value={folder.name}
              key={folder.id}
              className="border-0"
            >
              <AccordionTrigger className="px-2 text-sm">
                <SecondaryMenu {...folder} />
              </AccordionTrigger>
              <AccordionContent className="px-4">
                {folder.notes.map(note => (
                  <div
                    className="flex items-center px-2 text-sm rounded-md cursor-pointer py-1"
                    key={note.id}
                    onClick={() => navigate(`/notes/${note.id}`)}
                  >
                    <StickyNote className="h-4 w-4 mr-2" />
                    <span>{note.title}</span>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
          {singleNotes?.map((note) => (
            <div
              className="flex items-center px-2 text-sm rounded-md cursor-pointer py-1"
              key={note.id}
              onClick={() => navigate(`/notes/${note.id}`)}
            >
              <StickyNote className="h-4 w-4 mr-2" />
              <span>{note.title}</span>
            </div>
          ))}
        </Accordion>
      </div>
      {/*Tweaks */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2 text-sm text-muted-foreground">
          <span>Tweaks</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center px-2 py-1 text-sm  rounded-md cursor-pointer">
            <Bookmark className="h-4 w-4 mr-2" />
            <span>Shortcuts</span>
          </div>
          <div className="flex items-center px-2 py-1 text-sm rounded-md cursor-pointer">
            <RefreshCw className="h-4 w-4 mr-2" />
            <span>Sync notes</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
