import { useEffect, useState } from "react";
import { ContractCard } from "./ContractCard";
import { getPosts } from "../../services/postService";
import { mapSummary } from "../../mapper/postMapper";
import type { ContractSummary } from "../../types/contract";
import { useNavigate } from "react-router-dom";

export function ContractGrid() {
  const [contracts, setContracts] = useState<ContractSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPosts() {
      const data = await getPosts();
      const mapped = data.map(mapSummary);
      setContracts(mapped);
      setLoading(false);
    }

    loadPosts();
  }, []);

  if (loading) {
    return <p className="text-gray-400">Carregando...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contracts.map(contract => (
        <ContractCard
          key={contract.id}
          contract={contract}
          onSelect={() => navigate(`/posts/${contract.id}`)}
        />
      ))}
    </div>
  );
}