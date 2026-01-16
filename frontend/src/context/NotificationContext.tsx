import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getPendingNotificationCount } from "../services/solicitacoes.service";
import { useAuth } from "./AuthContext";

interface NotificationContextData {
  pendingCount: number;
  refreshPendingCount: () => Promise<void>;
}

const NotificationContext = createContext({} as NotificationContextData);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [pendingCount, setPendingCount] = useState(0);
  const { userLogado } = useAuth();
  
  async function refreshPendingCount() {
    if(!userLogado) return;

    try {
      const count = await getPendingNotificationCount();
      setPendingCount(count);
    } catch (err) {
      setPendingCount(0);
    }
  }

  useEffect(() => {
    refreshPendingCount();
  }, [userLogado]);

  return (
    <NotificationContext.Provider
      value={{
        pendingCount,
        refreshPendingCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
