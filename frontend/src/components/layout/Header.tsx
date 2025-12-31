import { Bell, LogOut } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { LogoutConfirmation } from "../auth/LogoutConfirmation";

export type HeaderView = "contracts" | "profile" | "managePosts";

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

  notificationCount?: number;
  onNotificationsClick?: () => void;

  navItems?: HeaderNavItem[];
  currentView?: HeaderView;
  onViewChange?: (view: HeaderView) => void;

  onLogout?: () => void;
}

export function Header({
  user,
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

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-purple-900/30 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-purple-900">
                <span className="font-semibold text-white">TF</span>
              </div>

              {/* Navigation */}
              {navItems && onViewChange && (
                <nav className="hidden md:flex gap-2">
                  {navItems.map((item) => {
                    const active = item.view === currentView;

                    return (
                      <button
                        key={item.view}
                        onClick={() => onViewChange(item.view)}
                        className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                          active
                            ? "border border-purple-900/50 bg-purple-900/30 text-purple-300"
                            : "text-gray-400 hover:bg-purple-900/10 hover:text-purple-300"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              )}
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              {onNotificationsClick && (
                <button
                  onClick={onNotificationsClick}
                  className="relative rounded-lg border border-purple-900/30 bg-gray-900/50 p-2 transition-colors hover:bg-purple-900/20"
                >
                  <Bell className="h-5 w-5 text-purple-400" />
                  {notificationCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
                      {notificationCount}
                    </span>
                  )}
                </button>
              )}

              {/* User */}
              {user && (
                <div className="flex items-center gap-3">
                  <span className="hidden text-sm text-white sm:block">
                    {user.name}
                  </span>

                  <Avatar className="border-2 border-purple-600">
                    <AvatarImage
                      src={user.photo ?? undefined}
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}

              {/* Logout */}
              {onLogout && (
                <button
                  onClick={() => setShowLogoutConfirmation(true)}
                  className="group rounded-lg border border-purple-900/30 bg-gray-900/50 p-2 transition-colors hover:border-red-900/30 hover:bg-red-900/20"
                  title="Sair"
                >
                  <LogOut className="h-5 w-5 text-purple-400 transition-colors group-hover:text-red-400" />
                </button>
              )}
            </div>
          </div>
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
