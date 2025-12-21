package com.example.backend.repositories;

import com.example.backend.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository  extends JpaRepository<User, UUID> {
    boolean existsByEmail(String email);
}
