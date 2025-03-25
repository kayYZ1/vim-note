import { useRef, useState } from "react";
import { Folder } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import { Folder as IFolder } from "@/lib/interfaces";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function EditFolder({ folder }: { folder: IFolder }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const colors = [
    "#FF0000", // Red
    "#FF7F00", // Orange
    "#FFFF00", // Yellow
    "#00FF00", // Green
    "#0000FF", // Blue
    "#4B0082", // Indigo
    "#9400D3", // Violet
    "#FF69B4", // Hot Pink
    "#00CED1", // Dark Turquoise
    "#8B4513", // Brown
    "#800080", // Purple
  ];
  const handleEditFolder = async () => {
    if (!inputRef.current?.value) {
      return;
    }

    await db.folders.update(folder.id, {
      name: inputRef.current.value,
      color: selectedColor ? selectedColor : null,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span
          className="flex items-center gap-3 px-3 py-2 text-sm cursor-pointer transition-colors rounded-md"
          id="create-folder"
        >
          <Folder className="h-5 w-5" />
          Edit folder
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit / Update folder</DialogTitle>
          <DialogDescription>Make sure to pick a color!</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid flex-1 gap-2">
            <Input
              id="name"
              type="text"
              ref={inputRef}
              defaultValue={folder.name}
              required={true}
            />
          </div>
          <div className="flex justify-center gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color
                    ? "border-black scale-110"
                    : "border-white"
                } hover:scale-105 transition-transform`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select ${color}`}
              />
            ))}
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="submit" variant="default" onClick={handleEditFolder}>
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
