import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ inline = false }: { inline?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

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
      aria-checked={mounted ? isDark : false}
      type="button"
      className="relative w-11 h-11 rounded-full transition-all duration-500 focus:outline-none hover:scale-110 active:scale-95 group"
    >
      <div
        className="absolute inset-0 rounded-full backdrop-blur-md border transition-all duration-500 group-hover:shadow-lg"
        style={{
          borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.12)",
          background: isDark
            ? "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(30,64,175,0.1))"
            : "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.1))",
          boxShadow: isDark
            ? "0 0 12px rgba(59,130,246,0.15)"
            : "0 0 12px rgba(251,191,36,0.15)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {mounted && isDark ? (
          <Moon
            size={18}
            className="text-blue-300 transition-all duration-500 group-hover:scale-110"
            style={{
              filter: "drop-shadow(0 0 4px rgba(96,165,250,0.5))",
            }}
          />
        ) : (
          <Sun
            size={18}
            className="text-amber-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-45"
            style={{
              filter: "drop-shadow(0 0 4px rgba(251,191,36,0.4))",
            }}
          />
        )}
      </div>
    </button>
  );
}

export default ThemeToggle;
