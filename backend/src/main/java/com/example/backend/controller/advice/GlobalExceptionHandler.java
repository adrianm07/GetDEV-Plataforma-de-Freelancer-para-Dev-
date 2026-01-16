package com.example.backend.controller.advice;

import com.example.backend.exceptions.*;
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

    //Acao proibida
    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<String> handleForbidden(ForbiddenException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }

    @ExceptionHandler(PostNaoDisponivelException.class)
    public ResponseEntity<String> handlePostNaoDisponivel(PostNaoDisponivelException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(PostNaoEncontradoException.class)
    public ResponseEntity<String> handlePostNaoEncontrado(PostNaoEncontradoException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(SolicitacaoJaEnviadaException.class)
    public ResponseEntity<String> handleSolicitacaoJaEnviada(SolicitacaoJaEnviadaException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(SolicitacaoNaoEncontradaException.class)
    public ResponseEntity<String> handleSolicitacaoNaoEncontrada(SolicitacaoNaoEncontradaException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(PostJaConcluidoException.class)
    public ResponseEntity<String> handlePostJaConcluido(PostJaConcluidoException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(PostNaoPossuiDesenvolvedorAceitoException.class)
    public ResponseEntity<String> handlePostNaoPossuiDesenvolvedorAceito(PostNaoPossuiDesenvolvedorAceitoException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(PostNaoConcluidoException.class)
    public ResponseEntity<String> handlePostNaoConcluido(PostNaoConcluidoException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }
}

