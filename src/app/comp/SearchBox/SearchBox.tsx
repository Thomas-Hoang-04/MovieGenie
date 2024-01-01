"use client";

import { Input } from "@/components/ui/input";
import { Category, TypeText } from "@/lib/types";
import { useEffect, useState, forwardRef } from "react";
import { useRouter } from "next/navigation";
import "./SearchBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

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
    const [atc, setAtc] = useState<string>("one-time-code");
    const router = useRouter();

    useEffect(() => {
      window.addEventListener("keydown", EnterEvent);

      navigator.userAgent.includes("Firefox" || "FxiOS") ? setAtc("off") : null;

      return () => {
        window.removeEventListener("keydown", EnterEvent);
      };
    }, []);

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
          <FontAwesomeIcon icon={faSearch} size="xl" />
          <p className="trigger">Search</p>
        </Button>
      </section>
    );
  }
);

SearchBox.displayName = "SearchBox";

export default SearchBox;
