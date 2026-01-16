import { useEffect, useState } from "react";
import { aceitarSolicitacao, getSolicitacoesUsuarioLogado, recusarSolicitacao } from "../../services/solicitacoes.service";
import { mapSolicitacaoToNotification } from "../../mapper/solicitacaoMapper";
import type { NotificationDTO, NotificationStatus } from "../../types/notification";
import { Notifications } from "../../components/Notifications";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import type { AccountType } from "../../types/accountType";

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
                    toast.success("Solicitação aceita com sucesso", {
                        duration: 1000,
                        position: "bottom-right"
                    });
                    break;
                case "RECUSADA":
                    await recusarSolicitacao(id);
                    toast.success("Solicitação recusada com sucesso", {
                        duration: 1000,
                        position: "bottom-right"
                    });
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
    const role: AccountType | undefined = userLogado?.role === "CONTRATANTE" ? "CONTRATANTE" : "DESENVOLVEDOR";
    return(
        <Notifications
            notifications={notifications}
            accountType={role}
            onUpdateStatus={handleUpdateStatus}
        />
        
    );
}