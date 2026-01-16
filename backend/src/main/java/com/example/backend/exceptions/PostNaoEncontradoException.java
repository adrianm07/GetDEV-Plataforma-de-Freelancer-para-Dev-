package com.example.backend.exceptions;

public class PostNaoEncontradoException extends RuntimeException {
    public PostNaoEncontradoException(String message) {
        super(message);
    }
}
