"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function BackToTop() {
  const [show, setShow] = useState<boolean>(false);
  const handleScroll = useCallback(() => {
    window.scrollY > 20 ? setShow(true) : setShow(false);
  }, []);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }

  return (
    <Button
      size={"lg"}
      className={`px-4 w-12 h-12 fixed bottom-8 right-6 bg-teal-600 dark:bg-slate-200 ${
        show ? "block" : "hidden"
      }`}
      onClick={() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }}>
      <FontAwesomeIcon
        icon={faArrowUp}
        size="xl"
        className="dark:text-teal-800"
      />
    </Button>
  );
}
