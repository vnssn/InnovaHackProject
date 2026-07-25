"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex w-full bg-surface font-body-md text-on-surface min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="lg:pl-72 flex flex-col w-full min-h-screen">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-md lg:p-xl overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
