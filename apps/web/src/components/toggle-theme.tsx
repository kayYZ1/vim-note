import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

import { useThemeToggle } from "@/shared/hooks/use-theme";
import { Button } from "@/components/ui/button";

export default function ToggleTheme() {
  const { theme, toggleTheme } = useThemeToggle();

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} id="theme-toggle">
      <div className="relative h-[1.2rem] w-[1.2rem]">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{
            opacity: theme === "dark" ? 0 : 1,
            y: theme === "light" ? 0 : 20,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: theme === "dark" ? 1 : 0,
            y: theme === "light" ? -20 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        </motion.div>
      </div>
    </Button>
  );
}
