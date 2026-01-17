import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { Header, type HeaderView } from "./Header";
import { useState } from "react";
import { useNotifications } from "../context/NotificationContext";
import type { AccountType } from "../types/accountType";

export function AppLayout() {
  const { userLogado, logout } = useAuth();
  const { pendingCount } = useNotifications()
  const navigate = useNavigate(); 
  const [currentView, setCurrentView] = useState<HeaderView>("posts");

  function handleLogout(){
    logout();
    navigate("/auth/login");
  }

  function handleNotificationsClick(){
    navigate("/solicitacoes");
    setCurrentView("solicitacoes");
  }

  function handleViewChange(view: HeaderView){
      setCurrentView(view);

      switch(view){
        case "posts":
          navigate("/posts"); 
          break;
        case "profile":
          navigate("/profile");
          break;
        case "managePosts":
          navigate("/managePosts");
          break;
        case "solicitacoes":
          navigate("/solicitacoes");
          break;
      }
  }
const role: AccountType = (userLogado?.role === "CONTRATANTE" ? "CONTRATANTE" : "DESENVOLVEDOR") as AccountType;

  return (
    <>
      <Header
        user={
          userLogado
            ? {
                name: userLogado.name,
                photo: userLogado.avatar,
              }
            : undefined
        }
        role={role}
        navItems={[
          { label: "Contratos", view: "posts" },
          { label: "Perfil", view: "profile" },
          { label: "Meus Posts", view: "managePosts" },
          { label: `Solicitações (${pendingCount})`, view: "solicitacoes"}
        ]}
        currentView={currentView}
        onViewChange={handleViewChange}
        onNotificationsClick={handleNotificationsClick}
        notificationCount={pendingCount}
        onLogout={handleLogout}
      />

      <main >
        {/* espaço por causa do header sticky */}
        <Outlet />
      </main>
    </>
  );
}