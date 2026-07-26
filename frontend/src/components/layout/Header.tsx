"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useNotifications } from "@/hooks/useNotifications";
import { logout } from "@/lib/api";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: notificationsData } = useNotifications(true, 1, 5);
  const unreadCount = notificationsData?.unread_count ?? 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/transactions?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    clearAuth();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 h-16 w-full bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 z-40 px-md lg:px-xl flex items-center justify-between">
      <div className="flex items-center gap-md flex-1 max-w-[576px]">
        {onMenuClick && (
          <button className="lg:hidden p-xs rounded-full hover:bg-surface-container text-on-surface" onClick={onMenuClick}>
            <span className="material-symbols-outlined">menu</span>
          </button>
        )}
        <form onSubmit={handleSearch} className="relative w-full group hidden sm:block">
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] transition-colors group-focus-within:text-primary">
            search
          </span>
          <input
            className="w-full bg-surface-container-highest/50 border-none rounded-full py-base pl-12 pr-md text-body-md focus:ring-1 focus:ring-primary outline-none transition-all"
            placeholder="Search transactions..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      <div className="flex items-center gap-md">
        <div 
          className="relative p-base hover:bg-surface-container rounded-full cursor-pointer transition-colors group"
          onClick={() => alert("No new notifications")}
        >
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-surface">
            notifications
          </span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-tertiary rounded-full ring-2 ring-surface"></span>
        </div>
        <div className="flex items-center gap-sm pl-md border-l border-outline-variant/50 cursor-pointer group">
          <div className="flex flex-col items-end hidden lg:flex">
            <span className="text-label-md font-semibold text-on-surface">{user?.name || user?.email || 'User'}</span>
            <span className="text-label-sm text-on-surface-variant">Premium Member</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
            <span className="material-symbols-outlined text-on-primary text-[20px]">person</span>
          </div>
          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-surface-container border border-outline-variant/30 rounded-2xl shadow-2xl z-20 py-1">
                <button onClick={handleLogout} className="w-full text-left px-md py-sm hover:bg-surface-container-highest text-on-surface font-label-md text-label-md flex items-center gap-sm">
                  <span className="material-symbols-outlined text-[16px]">logout</span> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
