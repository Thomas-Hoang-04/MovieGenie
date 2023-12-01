import { Blockletter } from "@/app/assets/fonts/font";
import { ThemeButton } from "../Theme/ThemeSwitcher";
import "./Header.scss";
import { Suspense } from "react";

export default function Header(): React.ReactElement {
  return (
    <header className="header">
      <h1 className={Blockletter.className}>MovieGenie</h1>
      <ThemeButton></ThemeButton>
    </header>
  );
}
