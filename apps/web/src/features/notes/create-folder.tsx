import { useRef } from "react";
import { Folder } from "lucide-react";
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


export default function CreateFolder() {
  const inputRef = useRef<HTMLInputElement>(null);

  const onCreateFolder = async () => {
    if (!inputRef.current?.value) return;

    await db.folders.add({
      id: nanoid(),
      name: inputRef.current.value,
      notes: []
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex items-center gap-3 px-3 py-2 text-sm cursor-pointer transition-colors rounded-md">
          <Folder className="h-5 w-5" />
          Folder
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Folder name</DialogTitle>
          <DialogDescription>Make it catchy</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input id="name" type="text" ref={inputRef} required={true} />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="submit" variant="default" onClick={onCreateFolder}>
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
