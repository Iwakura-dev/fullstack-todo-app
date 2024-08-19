"use client";

import { routes } from "@/constants/routes.constants";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { DiReact } from "react-icons/di";

export const Header = () => {
  const route = useRouter();
  const pathname = usePathname();

  return (
    <header>
      <div className="flex shadow-md justify-between items-center px-4">
        <div>
          <button type="button" onClick={() => route.push("/")}>
            <DiReact size={50} />
          </button>
        </div>
        <div>
          <nav>
            <ul className="flex gap-4">
              {routes.map((route) => {
                const isActive =
                  pathname === route.href ||
                  pathname.startsWith(route.href + "/");
                return (
                  <li key={route.id}>
                    <Link
                      href={route.href}
                      className={clsx(
                        "font-sm",
                        isActive ? "text-orange-500" : ""
                      )}
                    >
                      {route.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
