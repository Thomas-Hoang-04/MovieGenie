"use client";

import { Input } from "@/components/ui/input";
import { Category, TypeText } from "@/lib/types";
import { useEffect, useState, forwardRef } from "react";
import { useRouter } from "next/navigation";
import "./SearchBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

interface SearchProps {
  type: Category;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const EnterEvent = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    document.getElementById("search")?.blur();
    document.getElementById("search-btn")?.click();
  }
};

const SearchBox = forwardRef<HTMLInputElement, SearchProps>(
  ({ type, setQuery }, ref) => {
    const [mounted, setMounted] = useState<boolean>(false);
    const { theme } = useTheme();
    const [atc, setAtc] = useState<string>("one-time-code");
    const router = useRouter();

    useEffect(() => {
      setMounted(true);
      window.addEventListener("keydown", EnterEvent);

      navigator.userAgent.includes("Firefox" || "FxiOS") ? setAtc("off") : null;

      return () => {
        window.removeEventListener("keydown", EnterEvent);
      };
    }, []);

    if (!mounted) return null;

    return (
      <section className="search">
        <Input
          type="text"
          id="search"
          name={`${type}-search`}
          className="search-box"
          placeholder={`Find your favourite ${TypeText(type)}`}
          ref={ref}
          autoComplete={atc}
        />
        <Button
          id="search-btn"
          className="search-btn"
          aria-label="Search"
          onClick={() => {
            if (ref && "current" in ref) {
              setQuery(ref.current?.value as string);
              router.push("/" + type + "?q=" + (ref.current?.value as string));
            }
          }}>
          <FontAwesomeIcon
            icon={faSearch}
            size="xl"
            color={theme === "dark" ? "#0f766e" : "#e5e5e5"}
          />
          <p className="trigger">Search</p>
        </Button>
      </section>
    );
  }
);

export default SearchBox;
