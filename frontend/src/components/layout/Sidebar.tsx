"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { name: "Transactions", path: "/transactions", icon: "payments" },
    { name: "Analytics", path: "/analytics", icon: "insights" },
    { name: "Merchants", path: "/merchants", icon: "store" },
    { name: "Subscriptions", path: "/subscriptions", icon: "calendar_today" },
    { name: "Locations", path: "/locations", icon: "location_on" },
    { name: "Budgets", path: "/budgets", icon: "account_balance_wallet" },
    { name: "Goals", path: "/goals", icon: "track_changes" },
    { name: "AI Assistant", path: "/ai-assistant", icon: "smart_toy" },
    { name: "Financial Replay", path: "/financial-replay", icon: "history" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low/60 backdrop-blur-xl border-r border-outline-variant/30 z-50 flex flex-col p-md">
      <div className="flex items-center gap-base mb-xl px-base">
        <span className="material-symbols-outlined text-primary text-[32px]">account_balance</span>
        <span className="font-headline-md text-headline-md tracking-tight text-on-surface ml-2">FinCore</span>
      </div>
      <nav className="flex-1 flex flex-col gap-xs overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={clsx(
                "flex items-center gap-sm px-md py-sm rounded-xl transition-all group",
                isActive
                  ? "bg-primary-container text-on-primary-container font-semibold shadow-lg shadow-primary/20"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              )}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="text-label-md">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
