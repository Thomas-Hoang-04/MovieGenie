"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./NavBar.scss";

export default function NavBar(): React.ReactElement {
  const pathname = usePathname();

  return (
    <nav className="nav-bar">
      <ul>
        <li className="group">
          <Link href="/movie" className="link">
            Movie
          </Link>
          <span
            className={`deco${
              pathname === "/movie" ? " active" : " "
            } group-hover:w-full`}></span>
        </li>
        <li className="group">
          <Link href="/tv" className="link">
            TV Series
          </Link>
          <span
            className={`deco${
              pathname === "/tv" ? " active" : " "
            } group-hover:w-full`}></span>
        </li>
        <li className="group">
          <Link href="/person" className="link">
            Actor/Actress
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
