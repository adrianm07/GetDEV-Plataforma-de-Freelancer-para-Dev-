package com.example.backend.dto;

import java.util.List;
import java.util.UUID;

public record UserResponseDTO(
        UUID id,
        String name,
        String email,
        String phone,
        String photo,
        String description,
        List<String> skills,
        String role,
        List<SummaryPostDTO> posts
) {
}
