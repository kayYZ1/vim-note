import { useRef } from "react";
import { Edit } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Note } from "@/lib/interfaces";
import { db } from "@/lib/db";

export default function EditNote({ note }: { note: Note }) {
  const noteTitleRef = useRef<HTMLInputElement>(null);
  const noteDescriptionRef = useRef<HTMLInputElement>(null);

  const onEditNote = async () => {
    if (!noteDescriptionRef.current && !noteTitleRef.current) {
      return;
    }

    await db.notes.update(note.id, {
      title: noteTitleRef.current?.value,
      description: noteDescriptionRef.current?.value,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Edit className="h-4 w-4 text-muted-foreground mt-2 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm top-60">
        <DialogHeader>
          <DialogTitle>Edit {note.title}</DialogTitle>
          <DialogDescription>
            Change title & description of your note
          </DialogDescription>
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
              defaultValue={note.title}
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
              defaultValue={note.description}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="submit" variant="default" onClick={onEditNote}>
              Submit changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
