"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ContractDetails } from "../../components/contracts/ContractDetails";

import type { PostResponseDTO, Contract } from "../../types/contract";

import { postToContract } from "../../mapper/postMapper";
import { api } from "../../services/api";

export default function PagePost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadPost() {
      try {
        if (!id) return;

        const response = await api.get<PostResponseDTO>(
          `/posts/${id}`
        );

        setContract(postToContract(response.data));
      } catch (err) {
        console.error("Erro ao carregar post:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

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

  return (
    <ContractDetails
      contract={contract}
      onBack={() => navigate("/contracts")}
      accountType="developer"
    />
  );
}
