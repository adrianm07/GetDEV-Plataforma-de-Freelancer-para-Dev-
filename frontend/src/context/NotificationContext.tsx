import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getPendingNotificationCount } from "../services/solicitacoes.service";

interface NotificationContextData {
  pendingCount: number;
  refreshPendingCount: () => Promise<void>;
}

const NotificationContext = createContext({} as NotificationContextData);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [pendingCount, setPendingCount] = useState(0);

  async function refreshPendingCount() {
    try {
      const count = await getPendingNotificationCount();
      setPendingCount(count);
    } catch (err) {
      console.error("Erro ao buscar notificações pendentes", err);
      setPendingCount(0);
    }
  }

  useEffect(() => {
    refreshPendingCount();
  }, []);

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
