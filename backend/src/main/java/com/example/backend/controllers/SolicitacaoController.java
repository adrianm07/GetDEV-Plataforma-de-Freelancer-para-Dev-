package com.example.backend.controllers;

import com.example.backend.dto.SolicitacaoResponseDTO;
import com.example.backend.service.SolicitacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/solicitacoes")

public class SolicitacaoController {

    private final SolicitacaoService solicitacaoService;

    public SolicitacaoController(SolicitacaoService solicitacaoService) {
        this.solicitacaoService = solicitacaoService;
    }

    @GetMapping("/enviadas")
    public ResponseEntity<List<SolicitacaoResponseDTO>>listByDev(){
        return ResponseEntity.ok(solicitacaoService.listSolicitacoesDev());
    }


}
