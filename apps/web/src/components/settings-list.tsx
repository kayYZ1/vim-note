import { Cloud, Keyboard, Settings } from "lucide-react";
import { Link } from "react-router";

export default function SettingsList() {
  return (
    <nav className="flex flex-col space-y-4 mt-auto">
      <div className="space-y-2">
        <div className="flex items-center justify-between px-2 text-sm text-muted-foreground">
          <span>Configuration</span>
        </div>
        <div className="space-y-1">
          <Link
            to="/settings/"
            className="w-full flex items-center gap-2 px-2 py-1 text-sm rounded-md hover:bg-accent"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
          <Link
            to="/settings/sync"
            className="w-full flex items-center gap-2 px-2 py-1 text-sm rounded-md hover:bg-accent"
          >
            <Cloud className="h-4 w-4" />
            <span>Synchronization</span>
          </Link>
          <Link
            to="/settings/bindings"
            className="w-full flex items-center gap-2 px-2 py-1 text-sm rounded-md hover:bg-accent"
          >
            <Keyboard className="h-4 w-4" />
            <span>Bindings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
