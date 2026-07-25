"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useNotifications } from '@/hooks/useNotifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { data: notifData } = useNotifications(1, 10, false);
  const notifications = notifData?.items ?? [];
  const unreadCount = notifData?.unread_count ?? 0;

  const markAllRead = useMutation({
    mutationFn: () => api.patch('/notifications/read-all'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const markRead = useMutation({
    mutationFn: (id: string) => api.patch(`/notifications/${id}/read`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <header className="sticky top-0 h-16 w-full bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 z-40 px-xl flex items-center justify-between">
      <div className="flex items-center gap-md flex-1 max-w-[576px]">
        <div className="relative w-full group">
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] transition-colors group-focus-within:text-primary">
            search
          </span>
          <input
            className="w-full bg-surface-container-highest/50 border-none rounded-full py-base pl-12 pr-md text-body-md focus:ring-1 focus:ring-primary outline-none transition-all"
            placeholder="Search transactions..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-md">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifs(!showNotifs); setShowUserMenu(false); }}
            className="relative p-base hover:bg-surface-container rounded-full cursor-pointer transition-colors group"
          >
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-surface">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-tertiary rounded-full ring-2 ring-surface flex items-center justify-center">
                <span className="text-[9px] font-bold text-on-tertiary">{unreadCount > 9 ? '9+' : unreadCount}</span>
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container rounded-2xl shadow-2xl border border-outline-variant/20 z-50 overflow-hidden">
              <div className="flex items-center justify-between px-md py-sm border-b border-outline-variant/20">
                <span className="font-headline-sm text-on-surface font-semibold">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={() => markAllRead.mutate()}
                    className="font-label-sm text-label-sm text-primary hover:text-primary-fixed transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center py-xl gap-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[32px]">notifications_none</span>
                    <p className="text-sm">No notifications</p>
                  </div>
                ) : notifications.map((n: any) => (
                  <button
                    key={n.id}
                    onClick={() => markRead.mutate(n.id)}
                    className={`w-full flex flex-col gap-xs px-md py-sm text-left hover:bg-surface-container-high transition-colors border-b border-outline-variant/10 ${!n.is_read ? 'bg-primary/5' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-sm">
                      <span className={`font-label-md text-label-md text-on-surface ${!n.is_read ? 'font-semibold' : ''}`}>{n.title}</span>
                      {!n.is_read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1"></span>}
                    </div>
                    <p className="font-body-sm text-on-surface-variant text-xs leading-snug line-clamp-2">{n.message}</p>
                    <span className="font-label-sm text-[10px] text-on-surface-variant/60">
                      {new Date(n.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifs(false); }}
            className="flex items-center gap-sm pl-md border-l border-outline-variant/50 cursor-pointer group"
          >
            <div className="flex flex-col items-end hidden lg:flex">
              <span className="text-label-md font-semibold text-on-surface">{user?.name ?? 'User'}</span>
              <span className="text-label-sm text-on-surface-variant">{user?.email ?? ''}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              <span className="font-label-md text-on-primary font-bold">{initials}</span>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-surface-container rounded-2xl shadow-2xl border border-outline-variant/20 z-50 overflow-hidden">
              <div className="px-md py-sm border-b border-outline-variant/20">
                <p className="font-label-md text-on-surface font-semibold truncate">{user?.name}</p>
                <p className="font-label-sm text-on-surface-variant truncate text-xs">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-sm px-md py-sm text-error hover:bg-error/10 transition-colors font-label-md text-label-md"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click-outside overlay to close dropdowns */}
      {(showNotifs || showUserMenu) && (
        <div className="fixed inset-0 z-30" onClick={() => { setShowNotifs(false); setShowUserMenu(false); }} />
      )}
    </header>
  );
}
