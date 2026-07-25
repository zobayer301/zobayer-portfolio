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
      className="relative w-14 h-7 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none shadow-inner"
    >
      <div
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 ${
          isDark ? "left-[calc(100%-26px)]" : "left-0.5"
        }`}
      >
        {mounted && isDark ? (
          <Moon size={12} className="text-gray-800" />
        ) : (
          <Sun size={12} className="text-amber-500" />
        )}
      </div>
    </button>
  );
}

export default ThemeToggle;
