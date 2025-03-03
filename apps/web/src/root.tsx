import { Outlet } from "react-router";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ToggleTheme from "./components/toggle-theme";

import Notes from "./features/notes";
import SettingsList from "./components/settings-list";

export default function RootLayout() {
  return (
    <div
      className="min-h-screen bg-background font-primary"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Header */}
      <header className="px-8 py-4">
        <div className="flex items-center justify-between px-4 py-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[200px] sm:w-[400px]">
              <div className="flex flex-col p-4">
                <div className="space-y-2 pb-4 border-b px-2">
                  <SheetTitle className="text-2xl font-bold">
                    vim-note
                  </SheetTitle>
                  <SheetDescription className="text-sm text-muted-foreground">
                    Add folders & create notes
                  </SheetDescription>
                </div>
                <Notes />
                <SettingsList />
              </div>
            </SheetContent>
          </Sheet>
          <ToggleTheme />
        </div>
      </header>
      {/* Main Content */}
      <main className="container mx-auto max-w-4xl">
        <Outlet />
      </main>
    </div>
  );
}
