import { Outlet } from "react-router"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ToggleTheme from "./components/toggle-theme"

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background font-primary">
      {/* Header */}
      <header className="px-8 py-4">
        <div className="flex items-center justify-between px-4 py-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              {/* Add your sidebar content here */}
              <nav className="flex flex-col space-y-4">
                {/* Add navigation items */}
              </nav>
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
  )
}