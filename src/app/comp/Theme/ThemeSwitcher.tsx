"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <div className="items-center gap-4 pl-4 hidden sm:flex">
        <FontAwesomeIcon
          icon={faSun}
          color={theme == "dark" ? "#e5e5e5" : "#0f766e"}
          size="xl"
        />
        <Switch
          className="data-[state=unchecked]:bg-teal-700 dark:data-[state=checked]:bg-neutral-200"
          checked={theme === "dark"}
          onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <FontAwesomeIcon
          icon={faMoon}
          color={theme == "dark" ? "#e5e5e5" : "#0f766e"}
          size="xl"
        />
      </div>
    </>
  );
}

export function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Button
      size="sm"
      className="dark:bg-slate-300 sm:hidden bg-teal-700 py-5 px-3 hover:bg-teal-600"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? (
        <FontAwesomeIcon icon={faMoon} color="#0f766e" size="lg" />
      ) : (
        <FontAwesomeIcon icon={faSun} color="#e5e5e5" size="lg" />
      )}
    </Button>
  );
}
