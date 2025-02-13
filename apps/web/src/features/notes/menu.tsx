import { Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import CreateFolder from "./create-folder"
import CreateNote from "./create-note"

export default function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Plus className="h-4 w-4 cursor-pointer hover:text-gray-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Notes actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <CreateFolder />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <CreateNote />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}