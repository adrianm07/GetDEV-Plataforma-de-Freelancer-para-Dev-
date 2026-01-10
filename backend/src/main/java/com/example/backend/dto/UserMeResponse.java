package com.example.backend.dto;

import java.util.UUID;

public record UserMeResponse(
        UUID id,
        String name,
        String email,
        String role,
        String avatar
) {}
