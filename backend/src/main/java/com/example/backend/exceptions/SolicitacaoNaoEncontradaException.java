package com.example.backend.exceptions;

public class SolicitacaoNaoEncontradaException extends RuntimeException {
    public SolicitacaoNaoEncontradaException(String message) {
        super(message);
    }
}
