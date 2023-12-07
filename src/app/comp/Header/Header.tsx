"use client";

import { useEffect, useState } from "react";
import { Blockletter } from "@/app/assets/fonts/font";
import { ThemeSwitch } from "../Theme/ThemeSwitcher";
import { useTheme } from "next-themes";
import "./Header.scss";

export default function Header(): React.ReactElement | null {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <header className="header">
      <h1 className={Blockletter.className}>MovieGenie</h1>
      <ThemeSwitch theme={theme} setTheme={setTheme} />
    </header>
  );
}
