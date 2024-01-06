"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

export default function BackToTop() {
  const [show, setShow] = useState<boolean>(false);
  const handleScroll = useCallback(() => {
    window.scrollY > 500 ? setShow(true) : setShow(false);
  }, []);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }

  return (
    <div className="fixed w-full -mx-6 pt-4">
      <Button
        className={cn(
          "flex gap-2 justify-center rounded-full text-base mx-auto px-5 bg-teal-500 dark:bg-neutral-200 transition-all duration-300 hover:bg-teal-600 dark:hover:bg-neutral-200 md:hover:bg-teal-700 md:dark:hover:bg-teal-700 md:dark:hover:text-neutral-200 dark:text-teal-700",
          show && "tranlate-y-0 opacity-100",
          !show && "-translate-y-20 opacity-100"
        )}
        onClick={() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }}>
        <FontAwesomeIcon icon={faArrowUp} />
        <p className="font-semibold">Back to top</p>
      </Button>
    </div>
  );
}
