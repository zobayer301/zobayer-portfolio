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
      className="fixed top-6 right-20 z-[9000] w-12 h-12 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 flex items-center justify-center text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300 min-h-[44px] min-w-[44px]"
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
