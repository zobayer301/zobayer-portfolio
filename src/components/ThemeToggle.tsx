import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ inline = false }: { inline?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? theme === "dark" : true;

  const toggle = useCallback(() => {
    const newTheme = isDark ? "light" : "dark";
    if (document.startViewTransition) {
      document.startViewTransition(() => setTheme(newTheme));
    } else {
      setTheme(newTheme);
    }
  }, [isDark, setTheme]);

  return (
    <button
      onClick={toggle}
      aria-label="Toggle day and night mode"
      role="switch"
      aria-checked={isDark}
      type="button"
      className="relative w-11 h-11 rounded-full border border-border bg-background/60 backdrop-blur-sm text-foreground/70 hover:text-foreground hover:bg-background/80 hover:border-foreground/20 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {isDark ? (
          <Moon size={18} className="transition-all duration-300" />
        ) : (
          <Sun size={18} className="transition-all duration-300" />
        )}
      </div>
    </button>
  );
}

export default ThemeToggle;
