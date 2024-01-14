"use client";

import { useEffect, useState } from "react";
import { Blockletter } from "@/app/assets/fonts/font";
import { ThemeSwitch } from "../Theme/ThemeSwitcher";
import { useTheme } from "next-themes";
import "./Header.scss";
import NavBar from "../NavBar/NavBar";
import Link from "next/link";

export default function Header(): React.ReactElement | null {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <header className="header">
      <Link href="/">
        <h1 className={Blockletter.className}>MovieGenie</h1>
      </Link>
      <section className="desktop-nav">
        <NavBar />
      </section>
      <ThemeSwitch theme={theme} setTheme={setTheme} />
    </header>
  );
}
