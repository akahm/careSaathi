"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  icon?: React.ReactNode;
  label: string;
}

export function SidebarLink({ href, icon, label }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 py-2 px-2 rounded-md transition-colors ${
        isActive
          ? "bg-blue-100 text-blue-600 font-semibold"
          : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
