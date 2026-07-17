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
      className="fixed top-6 right-20 z-[9000] w-12 h-12 rounded-full bg-black text-white border border-black flex items-center justify-center hover:bg-neutral-800 hover:border-neutral-800 transition-all duration-300 min-h-[44px] min-w-[44px] dark:bg-foreground/10 dark:text-foreground/80 dark:border-foreground/20 dark:hover:bg-foreground/20 dark:hover:border-foreground/40 dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
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
