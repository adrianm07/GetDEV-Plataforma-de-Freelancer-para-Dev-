package com.example.backend.exceptions;

public class PostNaoConcluidoException extends RuntimeException {
    public PostNaoConcluidoException(String message) {
        super(message);
    }
}
