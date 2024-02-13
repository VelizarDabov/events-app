"use client";
import { headerLinks } from "@/constants";
import { Link } from "lucide-react";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathname = usePathname();
  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${
              isActive ? "text-primary" : "text-gray-500"
            } flex-center p-medium-16 whitespace-nowrap `}
          >
            <div>
              {link.label}
            {/* <Link href={link.route}> {link.label}</Link> */}
            </div>
           
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
