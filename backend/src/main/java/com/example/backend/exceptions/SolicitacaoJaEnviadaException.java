package com.example.backend.exceptions;

public class SolicitacaoJaEnviadaException extends RuntimeException {
    public SolicitacaoJaEnviadaException(String message) {
        super(message);
    }
}
