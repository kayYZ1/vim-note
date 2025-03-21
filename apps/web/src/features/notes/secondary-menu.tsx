import { Folder as FolderIcon } from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { Folder } from "@/lib/interfaces";
import CreateNote from "./components/create-note";

export default function SecondaryMenu(folder: Folder) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex items-center cursor-pointer">
          <FolderIcon className="h-4 w-4 mr-2" />
          {folder.name}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-40 p-1 shadow-md rounded-lg border">
        <ContextMenuItem asChild>
          <CreateNote folder={folder} />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
