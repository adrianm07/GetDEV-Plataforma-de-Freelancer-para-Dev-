"use client";

import { useState } from "react";
import { toast } from "sonner";
import { enviarSolicitacao } from "../services/postService";
import axios from "axios";

export function useApplyPost() {
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  async function apply(postID: string) {
    if (loading || applied) return;

    try {
      setLoading(true);

      await enviarSolicitacao(postID);

      setApplied(true);

      toast.success(
        "Solicitação enviada com sucesso! O contratante entrará em contato."
      );
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;

        if (status === 409) {
          setApplied(true); 
          toast.warning(
            message || "Você já enviou uma solicitação para este post."
          );
          return;
        }
      }

      toast.error(error?.response?.data ?? "Erro ao enviar solicitação.", {
        duration: 2000,
        position: "bottom-right"
      });
    } finally {
      setLoading(false);
    }
  }

  return { apply, loading, applied };
}
