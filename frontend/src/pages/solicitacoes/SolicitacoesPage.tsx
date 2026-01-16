import { useEffect, useState } from "react";
import { aceitarSolicitacao, getSolicitacoesUsuarioLogado, recusarSolicitacao } from "../../services/solicitacoes.service";
import { mapSolicitacaoToNotification } from "../../mapper/solicitacaoMapper";
import type { NotificationDTO, NotificationStatus } from "../../types/notification";
import { Notifications } from "../../components/Notifications";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

export function SolicitacoesPage(){
    const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
    const { userLogado } = useAuth();

    useEffect(() => {
        async function fetchNotifications(){
            if (!userLogado) return;

            try{
                const solicitacoes = await getSolicitacoesUsuarioLogado();

                const mapped: NotificationDTO[] = solicitacoes.map(mapSolicitacaoToNotification);
                setNotifications(mapped);
            } catch(error: any){
                toast.error(error?.response?.data ?? "Erro ao buscar as solicitacoes!", {
                    duration: 2000,
                    position: "bottom-right",
                });
            }
        }

        fetchNotifications();
    }, [userLogado]);
    
    async function handleUpdateStatus(id: string, status: NotificationStatus) {

        try{
            switch(status){
                case "ACEITA":
                    await aceitarSolicitacao(id);
                    break;
                case "RECUSADA":
                    await recusarSolicitacao(id);
                    break;
            }

            setNotifications((prev) =>
                prev.map((n) =>
                    n.id === id ? { ...n, status } : n
                )
            );
        }catch(error: any){
            toast.error(error?.response?.data ?? "Erro ao alterar status da solicitacao!", {
                duration: 2000,
                position: "bottom-right",
            });
        }
    }
    return(
        <Notifications
            notifications={notifications}
            accountType={userLogado?.role}
            onUpdateStatus={handleUpdateStatus}
        />
        
    );
}