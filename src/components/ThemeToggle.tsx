import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ inline = false }: { inline?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle day and night mode"
      role="switch"
      aria-checked={mounted ? isDark : false}
      type="button"
      className={cn(
        "flex items-center justify-center rounded-full transition-colors duration-200 h-10 w-10 min-h-[40px] min-w-[40px]",
        "text-gray-800 hover:text-black hover:bg-black/10 dark:text-gray-300 dark:hover:text-gray-200 dark:hover:bg-white/15",
        "focus:outline-none"
      )}
    >
      {mounted && !isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}

export default ThemeToggle;