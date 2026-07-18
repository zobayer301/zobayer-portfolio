import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
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
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[9000] min-h-[44px] min-w-[44px] flex items-center w-16 h-9 rounded-full border border-black bg-black px-1 transition-colors duration-300 dark:bg-foreground/10 dark:border-foreground/20"
    >
      <span
        className={`flex items-center justify-center w-7 h-7 rounded-full bg-white text-black shadow-md transform transition-transform duration-300 dark:bg-foreground/80 dark:text-background ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {mounted && !isDark ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </span>
    </button>
  );
}

export default ThemeToggle;