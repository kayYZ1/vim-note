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
  isGenerating: boolean;
  onGenerateAI?: () => void;
}

export default function NoteActions({
  children,
  //isGenerating,
  onGenerateAI,
}: NoteActionsProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onSelect={onGenerateAI}>
          <span>Generate with AI</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ContextMenuShortcut>
                  <Brain className="h-4 w-4" />
                </ContextMenuShortcut>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-wrap">
                  Content written on the page will be your prompt
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
