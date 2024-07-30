"use client";

import { getLocalStorageAgreement } from "@/app/utils/localStorage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdHome, IoIosChatbubbles, IoIosSettings } from "react-icons/io";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/", icon: IoMdHome },
  {
    name: "Chat",
    href: "/chat",
    icon: IoIosChatbubbles,
  },
  { name: "Setting", href: "/setting", icon: IoIosSettings },
];
export default function NavLinks() {
  const pathname = usePathname();
  const [agreement, setAgreement] = useState<string>("false");

  useEffect(() => {
    const res = getLocalStorageAgreement();
    console.log("res", res);
    if (res) setAgreement("true");
  }, []);

  return pathname === "/agreement" ||
    pathname === "/agreement/privacy" ||
    pathname === "/chat" ||
    pathname === "/agreement/terms" ? (
    <></>
  ) : (
    <div className="flex flex-col max-w-screen-lg bg-primary border-t shadow-inner">
      <div className="flex flex-1 min-h-12">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={agreement === "true" ? link.href : "/agreement"}
              className={`${
                pathname === link.href ? "bg-secondary10" : ""
              } flex flex-1 justify-center items-center `}
            >
              <LinkIcon
                className={`${
                  pathname === link.href ? "text-blue" : "text-secondary10"
                }`}
                size={30}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
