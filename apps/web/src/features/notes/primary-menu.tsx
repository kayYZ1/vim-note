import { Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import CreateFolder from "./components/create-folder";
import CreateNote from "./components/create-note";

export default function PrimaryMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger id="sidebar-action">
        <Plus className="h-4 w-4 cursor-pointer transition-transform hover:rotate-90 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 p-1 shadow-lg rounded-lg border">
        <DropdownMenuLabel className="font-semibold px-3 py-2">
          Create new
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <CreateFolder />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <CreateNote folder={undefined} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
