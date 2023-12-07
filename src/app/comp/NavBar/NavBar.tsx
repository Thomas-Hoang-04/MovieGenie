"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./NavBar.scss";

export default function NavBar(): React.ReactElement {
  const pathname = usePathname();

  return (
    <nav className="nav-bar">
      <ul>
        <li
          className="group"
          onClick={() =>
            !pathname.includes("/movie") && sessionStorage.clear()
          }>
          <Link href="/movie" className="link">
            Movie
          </Link>
          <span
            className={`deco${
              pathname.includes("/movie") ? " active" : " "
            } group-hover:w-full`}></span>
        </li>
        <li
          className="group"
          onClick={() => !pathname.includes("/tv") && sessionStorage.clear()}>
          <Link href="/tv" className="link">
            TV Series
          </Link>
          <span
            className={`deco${
              pathname.includes("/tv") ? " active" : " "
            } group-hover:w-full`}></span>
        </li>
        <li
          className="group"
          onClick={() =>
            !pathname.includes("/person") && sessionStorage.clear()
          }>
          <Link href="/person" className="link">
            People
          </Link>
          <span
            className={`deco${
              pathname === "/person" ? " active" : " "
            } group-hover:w-full`}></span>
        </li>
      </ul>
    </nav>
  );
}
