import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ inline = false }: { inline?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      onClick={toggle}
      aria-label="Toggle day and night mode"
      role="switch"
      aria-checked={mounted ? isDark : false}
      type="button"
      className="relative w-9 h-9 rounded-full transition-all duration-300 focus:outline-none hover:scale-110 active:scale-95"
    >
      <div className="absolute inset-0 rounded-full backdrop-blur-md border transition-all duration-300"
        style={{
          borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
          background: isDark
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.5)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {mounted && isDark ? (
          <Moon size={16} className="text-blue-200" />
        ) : (
          <Sun size={16} className="text-amber-600" />
        )}
      </div>
    </button>
  );
}

export default ThemeToggle;
