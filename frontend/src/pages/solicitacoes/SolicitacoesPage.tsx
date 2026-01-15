import { useEffect, useState } from "react";
import { aceitarSolicitacao, getSolicitacoesUsuarioLogado, recusarSolicitacao } from "../../services/solicitacoes.service";
import { mapSolicitacaoToNotification } from "../../mapper/solicitacaoMapper";
import type { NotificationDTO, NotificationStatus } from "../../types/notification";
import { Notifications } from "../../components/Notifications";
import { useAuth } from "../../context/AuthContext";

export function SolicitacoesPage(){
    const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const { userLogado } = useAuth();

    useEffect(() => {
        async function fetchNotifications(){
            try{
                const solicitacoes = await getSolicitacoesUsuarioLogado();

                const mapped: NotificationDTO[] = solicitacoes.map(mapSolicitacaoToNotification);
                setNotifications(mapped);
            } catch(error){
                console.error("Erro ao buscar as solicitacoes", error);
            } finally{
                setLoading(false);
            }
        }

        fetchNotifications();
    }, []);
    
    async function handleUpdateStatus(id: string, status: NotificationStatus) {
        setLoading(true);

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
        }catch(error){
            console.error("Erro ao processar solicitação!", error);
        }
        finally{
            setLoading(false);
        }
    }

    if (loading) {
        return <p className="text-white p-8">Carregando notificações...</p>;
    }

    return(
        <Notifications
            notifications={notifications}
            accountType={userLogado?.role}
            onUpdateStatus={handleUpdateStatus}
        />
        
    );
}