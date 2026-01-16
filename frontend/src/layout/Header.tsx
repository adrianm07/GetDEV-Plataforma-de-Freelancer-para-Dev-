import { Bell, LogOut } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { LogoutConfirmation } from "../components/auth/LogoutConfirmation";
import type { AccountType } from "../types/accountType";

export type HeaderView = "posts" | "profile" | "managePosts" | "solicitacoes";


interface HeaderUser {
  name: string;
  photo?: string | null;
}

interface HeaderNavItem {
  label: string;
  view: HeaderView;
}

interface HeaderProps {
  user?: HeaderUser;
  role?: AccountType;

  notificationCount?: number;
  onNotificationsClick?: () => void;

  navItems?: HeaderNavItem[];
  currentView?: HeaderView;
  onViewChange?: (view: HeaderView) => void;

  onLogout?: () => void;
}

export function Header({
  user,
  role,
  notificationCount = 0,
  onNotificationsClick,
  navItems,
  currentView,
  onViewChange,
  onLogout,
}: HeaderProps) {
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  function handleConfirmLogout() {
    setShowLogoutConfirmation(false);
    onLogout?.();
  }

  const filteredNavItems =
    role === "DESENVOLVEDOR"
      ? navItems?.filter((item) => item.view !== "managePosts")
      : navItems;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-purple-900/30 bg-black">
        <div className="mx-auto max-w-7xl">

          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Esquerda */}
            <div className="flex items-center gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-purple-900">
                <span className="font-semibold text-white">TF</span>
              </div>
            </div>

            {/* Direita */}
            <div className="flex items-center gap-4">
              {onNotificationsClick && (
                <button
                  onClick={onNotificationsClick}
                  className="relative rounded-lg border border-purple-900/30 bg-gray-900/50 p-2 hover:bg-purple-900/20"
                >
                  <Bell className="h-5 w-5 text-purple-400" />
                  {notificationCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
                      {notificationCount}
                    </span>
                  )}
                </button>
              )}

              {user && (
                <div className="flex items-center gap-3">
                  <span className="hidden text-sm text-white sm:block">
                    {user.name}
                  </span>

                  <Avatar className="border-2 border-purple-600">
                    <AvatarImage src={user.photo ?? undefined} />
                    <AvatarFallback className="text-sm">
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}

              {onLogout && (
                <button
                  onClick={() => setShowLogoutConfirmation(true)}
                  className="group rounded-lg border border-purple-900/30 bg-gray-900/50 p-2 hover:bg-red-900/20"
                >
                  <LogOut className="h-5 w-5 text-purple-400 group-hover:text-red-400" />
                </button>
              )}
            </div>
          </div>

          {filteredNavItems && onViewChange && (
            <div className="border-t border-purple-900/30 bg-black/50">
              <nav className="flex gap-2 px-4 py-2 sm:px-6 lg:px-8">
                {filteredNavItems.map((item) => {
                  const active = item.view === currentView;

                  return (
                    <button
                      key={item.view}
                      onClick={() => onViewChange(item.view)}
                      className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                        active
                          ? "bg-purple-900/30 text-purple-300"
                          : "text-gray-400 hover:bg-purple-900/10 hover:text-purple-300"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {onLogout && (
        <LogoutConfirmation
          open={showLogoutConfirmation}
          onConfirm={handleConfirmLogout}
          onCancel={() => setShowLogoutConfirmation(false)}
        />
      )}
    </>
  );
}
