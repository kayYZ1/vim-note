import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
import { db } from "@/lib/db";
import { Note } from "@/lib/interfaces";

export default function DeleteNote({ note }: { note: Note }) {
  const pruneNoteImages = async (content: string) => {
    const imagePattern = /!\[.*?\]\(\/local-image\/([^)]+)\)/g;
    const matches = content.matchAll(imagePattern);
    const imageIds = Array.from(matches, (match) => match[1]);

    if (imageIds.length === 0) {
      return;
    }

    try {
      const numericIds = imageIds.map((id) => {
        const num = Number(id);
        if (isNaN(num)) throw new Error(`Invalid image ID: ${id}`);
        return num;
      });

      await db.images.bulkDelete(numericIds);
    } catch (error) {
      console.error("Failed to prune images:", error);
      throw error;
    }
  };

  const handleDeleteNote = async () => {
    const notes = await db.notes.toArray();
    if (notes.length <= 1) {
      toast.warning("Can't delete the last note");
      return;
    }
    if (note.content) {
      await pruneNoteImages(note.content);
    }
    await db.notes.delete(note.id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span
          className="flex items-center gap-3 px-3 py-2 text-sm cursor-pointer transition-colors rounded-md"
          id="delete-note"
        >
          <Trash2 className="h-5 w-5" />
          Delete note
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Note</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this note?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="submit" variant="default" onClick={handleDeleteNote}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
