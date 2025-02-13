import { useRef } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { db } from "@/lib/db"

export function CreateFolder() {
  const inputRef = useRef<HTMLInputElement>(null)

  const onCreateFolder = async () => {
    if (!inputRef.current?.value) return

    await db.folders.add({
      name: inputRef.current.value
    })
    console.log(inputRef.current.value)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Plus className="h-4 w-4 cursor-pointer hover:text-gray-700" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Folder name</DialogTitle>
          <DialogDescription>
            Make it catchy
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="name"
              type="text"
              ref={inputRef}
              required={true}
            />
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
    </Dialog >
  )
}
