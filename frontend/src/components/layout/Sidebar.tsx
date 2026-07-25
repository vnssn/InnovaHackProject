"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
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
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={clsx(
        "fixed left-0 top-0 h-full w-72 bg-surface-container-low/95 backdrop-blur-xl border-r border-outline-variant/30 z-50 flex flex-col p-md transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between mb-xl px-base">
          <div className="flex items-center gap-base">
            <span className="material-symbols-outlined text-primary text-[32px]">account_balance</span>
            <span className="font-headline-md text-headline-md tracking-tight text-on-surface ml-2">Spend Sense</span>
          </div>
          <button className="lg:hidden p-xs rounded-full hover:bg-surface-container text-on-surface" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
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
    </>
  );
}
