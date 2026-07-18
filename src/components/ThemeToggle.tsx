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
        "flex items-center justify-center rounded-full transition-colors duration-300",
        "bg-[#c1d1e0] border border-black text-black hover:bg-[#b3c4d6] dark:bg-white/10 dark:border-white/20 dark:text-white dark:hover:bg-white/20",
        inline
          ? "h-10 w-10 min-h-[40px] min-w-[40px]"
          : "fixed top-4 right-4 sm:top-6 sm:right-6 z-[9000] h-12 w-12 min-h-[44px] min-w-[44px]"
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