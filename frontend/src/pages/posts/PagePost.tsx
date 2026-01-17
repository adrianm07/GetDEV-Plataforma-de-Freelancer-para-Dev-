"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ContractDetails } from "../../components/contracts/ContractDetails";

import type { PostResponseDTO, Contract } from "../../types/contract";

import { postToContract } from "../../mapper/postMapper";
import { api } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import type { AccountType } from "../../types/accountType";

export default function PagePost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { userLogado } = useAuth();

  useEffect(() => {
    async function loadPost() {
      if(!userLogado) return;

      try {
        if (!id) return;

        const response = await api.get<PostResponseDTO>(
          `/posts/${id}`
        );

        setContract(postToContract(response.data));
      } catch (error: any) {
        toast.error(error?.response?.data ?? "Erro ao carregar Posts!", {
          duration: 2000,
          position: "bottom-right",
        });
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [userLogado, id]);

  /* ---------- estados ---------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Carregando contrato...
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Erro ao carregar o contrato
      </div>
    );
  }

  /* ---------- render ---------- */
const role: AccountType = (userLogado?.role === "CONTRATANTE" ? "CONTRATANTE" : "DESENVOLVEDOR") as AccountType;

  return (
    <ContractDetails
      contract={contract}
      onBack={() => navigate("/posts")}
      accountType={role}
    />
  );
}
