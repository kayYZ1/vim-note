import { JSX } from "react";
import { Brain, Trash, Image, Pencil } from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NoteActionsProps {
  children: JSX.Element;
  onGenerateAI?: () => void;
  onImageUpload?: () => void;
  onDrawing?: () => void;
  onClearNote?: () => void;
}

export default function NoteActions({
  children,
  onGenerateAI,
  onImageUpload,
  onDrawing,
  onClearNote,
}: NoteActionsProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64 rounded-xl shadow-lg border border-border/50 bg-background/95 backdrop-blur-sm">
        <ContextMenuItem
          inset
          onSelect={onGenerateAI}
          className="group relative flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition-all hover:bg-accent/80 focus:bg-accent/80"
        >
          <span className="flex-1 transition-all group-hover:pl-1">
            Expand with AI
          </span>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <ContextMenuShortcut className="opacity-70 transition-all group-hover:opacity-100 group-hover:scale-110">
                  <Brain className="h-4 w-4" />
                </ContextMenuShortcut>
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px] rounded-lg px-3 py-2 text-sm shadow-md">
                <p className="text-wrap">
                  Content written on the page will be your prompt
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          onSelect={onImageUpload}
          className="group relative flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition-all hover:bg-accent/80 focus:bg-accent/80"
        >
          <span className="flex-1 transition-all group-hover:pl-1">
            Insert image
          </span>
          <ContextMenuShortcut className="opacity-70 transition-all group-hover:opacity-100 group-hover:scale-110">
            <Image className="h-4 w-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          onSelect={onDrawing}
          className="group relative flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition-all hover:bg-accent/80 focus:bg-accent/80"
        >
          <span className="flex-1 transition-all group-hover:pl-1">
            Insert drawing
          </span>
          <ContextMenuShortcut className="opacity-70 transition-all group-hover:opacity-100 group-hover:scale-110">
            <Pencil className="h-4 w-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          inset
          onSelect={onClearNote}
          className="group relative flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition-all hover:bg-accent/80 focus:bg-accent/80"
        >
          <span className="flex-1 transition-all group-hover:pl-1">
            Clear note
          </span>
          <ContextMenuShortcut className="opacity-70 transition-all group-hover:opacity-100 group-hover:scale-110">
            <Trash className="h-4 w-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
