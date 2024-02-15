"use client";
import { headerLinks } from "@/constants";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

const NavItems = () => {
  const pathname = usePathname();
  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <div
            key={link.route}
            className={`${
              isActive ? "text-primary" : "text-gray-500"
            } flex-center p-medium-16 whitespace-nowrap `}
          >
          <Link href={link.route}>
      {link.label}
          </Link>
           
          </div>
        );
      })}
    </ul>
  );
};

export default NavItems;
