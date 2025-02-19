import { JSX } from "react";
import { Brain, Trash, Image, Pencil } from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export default function NoteActions({ children }: { children: JSX.Element }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Generate with AI
          <ContextMenuShortcut>
            <Brain className="h-4 w-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Insert image
          <ContextMenuShortcut>
            <Image className="h-4 w-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Insert drawing
          <ContextMenuShortcut>
            <Pencil className="h-4 w-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Clear note
          <ContextMenuShortcut>
            <Trash className="h-4 w-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
