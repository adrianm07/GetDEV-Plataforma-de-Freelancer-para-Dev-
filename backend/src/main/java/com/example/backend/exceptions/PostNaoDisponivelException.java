package com.example.backend.exceptions;

public class PostNaoDisponivelException extends RuntimeException {
    public PostNaoDisponivelException(String message) {
        super(message);
    }
}
