"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      onClick={() => setTheme(next)}
      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 text-sm shadow-sm hover:bg-white dark:border-slate-800 dark:bg-slate-950/40 dark:hover:bg-slate-950"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{next === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}