import { useEffect, useState } from "react";
import { ContractCard } from "./ContractCard";
import { getPosts } from "../../services/postService";
import { mapSummary } from "../../mapper/postMapper";
import type { ContractSummary } from "../../types/contract";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ContractGridProps{
  filters : string[]
}

export function ContractGrid({filters} : ContractGridProps) {
  const [contracts, setContracts] = useState<ContractSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userLogado } = useAuth();

  useEffect(() => {
    async function loadPosts() {
      if(!userLogado) return;
      
      const data = await getPosts();
      const mapped = data.map(mapSummary);
      setContracts(mapped);
      setLoading(false);
    }

    loadPosts();
  }, [userLogado]);

  const filteredContracts =
  filters.length === 0
    ? contracts
    : contracts.filter(contract =>
        contract.technologies.some(tech => filters.includes(tech))
      );

  if (loading) {
    return <p className="text-gray-400">Carregando...</p>;
  }

  

return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredContracts.length === 0 && (
      <p className="text-gray-400 col-span-full text-center">
        Nenhum contrato encontrado para os filtros selecionados.
      </p>
    )}
  
  
    {filteredContracts.map(contract => (
      <ContractCard
        key={contract.id}
        contract={contract}
        onSelect={() => navigate(`/posts/${contract.id}`)}
      />
    ))}
  </div>
);
}