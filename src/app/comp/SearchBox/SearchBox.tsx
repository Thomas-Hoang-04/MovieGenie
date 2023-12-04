"use client";

import { Input } from "@/components/ui/input";
import { Category, TypeText } from "@/lib/types";
import { useEffect, useState, useRef } from "react";
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

const SearchBox = ({ type, setQuery }: SearchProps) => {
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    window.addEventListener("keydown", EnterEvent);

    const type_cache = sessionStorage.getItem("type");
    const query_cache = sessionStorage.getItem("query");

    sessionStorage.removeItem("type");
    sessionStorage.removeItem("query");

    if (type_cache === type && query_cache) {
      setQuery(query_cache);
      setTimeout(() => {
        inputRef.current!.value = query_cache;
      }, 100);
    }

    return () => {
      window.removeEventListener("keydown", EnterEvent);
    };
  }, [type, setQuery]);

  if (!mounted) return null;

  return (
    <section className="search">
      <Input
        type="text"
        id="search"
        name={`${type}-search`}
        className="search-box"
        placeholder={`Find your favourite ${TypeText(type)}`}
        ref={inputRef}
      />
      <Button
        id="search-btn"
        className="search-btn"
        aria-label="Search"
        onClick={() => {
          setQuery(inputRef.current?.value as string);
        }}>
        <FontAwesomeIcon
          icon={faSearch}
          size="lg"
          color={theme === "dark" ? "#0f766e" : "#e5e5e5"}
        />
      </Button>
    </section>
  );
};

export default SearchBox;