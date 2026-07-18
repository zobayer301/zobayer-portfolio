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
        "flex items-center w-14 h-8 rounded-full border border-black bg-black px-1 transition-colors duration-300 dark:bg-white/10 dark:border-white/20",
        inline
          ? ""
          : "fixed top-4 right-4 sm:top-6 sm:right-6 z-[9000] min-h-[44px] min-w-[44px]"
      )}
    >
      <span
        className={`flex items-center justify-center w-6 h-6 rounded-full bg-white text-black shadow-md transform transition-transform duration-300 dark:bg-white/80 dark:text-black ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {mounted && !isDark ? (
          <Sun className="w-3.5 h-3.5" />
        ) : (
          <Moon className="w-3.5 h-3.5" />
        )}
      </span>
    </button>
  );
}

export default ThemeToggle;