"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdBusiness, IoMdContact, IoMdPaper } from "react-icons/io";
import { IoMegaphone } from "react-icons/io5";

const links = [
  //   { name: "My page", href: "/", icon: IoMdContact },
  // { name: "About us", href: "setting/aboutUs", icon: IoMdBusiness },
  { name: "Terms of use", href: "setting/termsOfUse", icon: IoMdPaper },
  { name: "Privacy Policy", href: "setting/privacyPolicy", icon: IoMdPaper },
];

export default function SettingNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col bg-primary">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center min-h-16 gap-x-2 px-4 hover:bg-secondary10 hover:text-blue"
          >
            <LinkIcon className="text-secondar" size={30} />
            <h1>{link.name}</h1>
          </Link>
        );
      })}
    </div>
  );
}
