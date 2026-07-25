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
      className="relative w-9 h-9 rounded-full transition-all duration-300 focus:outline-none shadow-lg hover:shadow-xl hover:scale-125 hover:rotate-12 active:scale-95"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #1e293b, #334155)"
          : "linear-gradient(135deg, #fbbf24, #f59e0b)",
        boxShadow: isDark
          ? "0 0 20px rgba(96, 165, 250, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "0 0 20px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {mounted && isDark ? (
          <Moon size={16} className="text-blue-200" />
        ) : (
          <Sun size={16} className="text-white" />
        )}
      </div>
    </button>
  );
}

export default ThemeToggle;
