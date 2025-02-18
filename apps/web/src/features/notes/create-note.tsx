import { useRef } from "react";
import { StickyNote } from "lucide-react";
import { nanoid } from "nanoid";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { db } from "@/lib/db";
import { getCurrentDate } from "@/lib/utils";
import { Folder } from "@/lib/interfaces";

export default function CreateNote({ folder }: { folder: Folder | undefined }) {
  const noteTitleRef = useRef<HTMLInputElement>(null);
  const noteDescriptionRef = useRef<HTMLInputElement>(null);

  const onCreateNote = async () => {
    if (!noteTitleRef.current?.value || !noteDescriptionRef.current?.value) {
      return;
    }

    const note = {
      id: nanoid(),
      title: noteTitleRef.current.value,
      description: noteDescriptionRef.current.value,
      date: getCurrentDate(),
    };

    await db.notes.add(note);

    if (folder) {
      folder.notes.push(note);
      await db.folders.update(folder.id, { notes: folder.notes });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex items-center gap-3 px-3 py-2 text-sm cursor-pointer transition-colors rounded-md">
          <StickyNote className="h-5 w-5" />
          {folder ? "Create note" : "Note"}
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Note info</DialogTitle>
          <DialogDescription>Make it catchy :]</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              type="text"
              ref={noteTitleRef}
              placeholder="Node.js"
              required={true}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Input
              id="description"
              type="text"
              ref={noteDescriptionRef}
              placeholder="Aczkolwiek za kazdym razem [...]"
              required={true}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="submit" variant="default" onClick={onCreateNote}>
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
