import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { Header, type HeaderView } from "./Header";
import { useState } from "react";
import { useNotifications } from "../context/NotificationContext";

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
    navigate("/notifications");
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

  return (
    <>
      <Header
        user={
          userLogado
            ? {
                name: userLogado.name,
                photo: userLogado.photo,
              }
            : undefined
        }
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

      <main className="pt-16">
        {/* espaço por causa do header sticky */}
        <Outlet />
      </main>
    </>
  );
}