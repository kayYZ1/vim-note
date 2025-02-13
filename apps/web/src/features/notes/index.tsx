import { Folder, Bookmark, RefreshCw } from 'lucide-react'
import { useLiveQuery } from "dexie-react-hooks"

import { CreateFolder } from './create-folder'
import { db } from '@/lib/db'

export default function Notes() {

  const folders = useLiveQuery(() => db.folders.toArray())

  return (
    <nav className="flex flex-col space-y-4 mt-6 flex-1">
      {/* Folders section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2 text-sm text-gray-500">
          <span>Folders</span>
          <CreateFolder />
        </div>
        {/* Folders and notes */}
        <div className="space-y-1">
          {
            folders?.map((folder) => (
              <div className="flex items-center px-2 py-1 text-sm  rounded-md cursor-pointer" key={folder.id}>
                <Folder className="h-4 w-4 mr-2" />
                <span>{folder.name}</span>
              </div>
            ))
          }
        </div>
      </div>
      {/*Tweaks */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2 text-sm text-gray-500">
          <span>Tweaks</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center px-2 py-1 text-sm  rounded-md cursor-pointer">
            <Bookmark className="h-4 w-4 mr-2" />
            <span>Shortcuts</span>
          </div>
          <div className="flex items-center px-2 py-1 text-sm rounded-md cursor-pointer">
            <RefreshCw className="h-4 w-4 mr-2" />
            <span>Sync notes</span>
          </div>
        </div>
      </div>
    </nav>
  )
}