"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import "./SearchBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

interface SearchProps {
  type: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBox = ({ type, setQuery }: SearchProps) => {
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <section className="search">
      <Input
        name={`${type}-search`}
        className="search-box"
        placeholder={`Find your favorite ${type}`}
        ref={inputRef}
      />
      <Button
        className="search-btn"
        onClick={() => setQuery(inputRef.current?.value as string)}>
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
