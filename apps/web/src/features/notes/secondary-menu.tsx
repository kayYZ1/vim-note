import { Folder } from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import CreateNote from "./create-note";

export default function SecondaryMenu({ folderName }: { folderName: string }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex items-center cursor-pointer">
          <Folder className="h-4 w-4 mr-2" />
          {folderName}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-40 p-1 shadow-md rounded-lg border">
        <ContextMenuItem asChild>
          <CreateNote />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}