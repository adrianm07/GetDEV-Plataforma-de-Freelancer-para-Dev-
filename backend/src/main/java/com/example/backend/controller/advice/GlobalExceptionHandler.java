package com.example.backend.controller.advice;

import com.example.backend.exceptions.EmailJaCadastradoException;
import com.example.backend.exceptions.InvalidLoginException;
import com.example.backend.exceptions.PostJaPossuiDesenvolvedorException;
import com.example.backend.exceptions.SolicitacaoJaAceitaException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> handleUsernameNotFound(UsernameNotFoundException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }
    //Login invalido
    @ExceptionHandler(InvalidLoginException.class)
    public ResponseEntity<String> handleNotFound(InvalidLoginException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    //Email ja cadastrado na hora de criar a conta
    @ExceptionHandler(EmailJaCadastradoException.class)
    public ResponseEntity<String> handleEmailJaCadastrado(EmailJaCadastradoException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    //Solicitaçao já aceita
    @ExceptionHandler(SolicitacaoJaAceitaException.class)
    public ResponseEntity<String> handleSolicitacaoJaAceita(EmailJaCadastradoException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    //Post ja possui dev
    @ExceptionHandler(PostJaPossuiDesenvolvedorException.class)
    public ResponseEntity<String> handlePostJaPossuiDevenvolvedor(PostJaPossuiDesenvolvedorException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }
}
