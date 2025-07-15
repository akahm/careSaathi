"use client";

import { SidebarLink } from "./sidebarlink";
import Image from "next/image";
import {
  Activity, Users, FileText
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r hidden md:block shadow-sm">
       <div className="pl-10 pt-4 max-w-[150px] sm:max-w-[200px]">
                    <Image
                      src="/logowhite.svg"
                      alt="CareSaathi Logo"
                      width={200}
                      height={60}
                      className="  h-10   sm:h-12 w-auto max-w-full"
                      priority
                    />
                  </div>
      <nav className="space-y-2 text-sm font-medium px-4">
        <div className="text-gray-500 text-xs uppercase pt-4">Dashboard</div>
        <SidebarLink href="/Admin/dashboard" icon={<Activity className="w-4 h-4" />} label="Dashboard" />

        <div className="text-gray-500 text-xs uppercase pt-4">Career Management</div>
        <SidebarLink href="/Admin/jobs" icon={<Users className="w-4 h-4" />} label="All Jobs" />
        <SidebarLink href="/Admin/publicjobs" label="Public Jobs" />
        <SidebarLink href="/Admin/viewjobs" label="View All Jobs" />

        <div className="text-gray-500 text-xs uppercase pt-4">Master Data</div>
        <SidebarLink href="/admin/terms" icon={<FileText className="w-4 h-4" />} label="Terms & Conditions" />
      </nav>
    </aside>
  );
}
