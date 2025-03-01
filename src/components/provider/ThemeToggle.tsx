'use client';

import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      className="bg-background hover:bg-background/50 mt-16 cursor-pointer rounded-md border-2 px-4 py-2 font-semibold"
      onClick={() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
      }}
    >
      Change Theme
    </button>
  );
}
