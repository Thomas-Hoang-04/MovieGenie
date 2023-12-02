import { Switch } from "@/components/ui/switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { ThemeProps } from "@/lib/types";

export function ThemeSwitch({ theme, setTheme }: ThemeProps) {
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
      <Button
        size="sm"
        className="dark:bg-slate-200 sm:hidden bg-teal-700 py-5 px-3 hover:bg-teal-600"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? (
          <FontAwesomeIcon icon={faMoon} color="#0f766e" size="lg" />
        ) : (
          <FontAwesomeIcon icon={faSun} color="#e5e5e5" size="lg" />
        )}
      </Button>
    </>
  );
}
