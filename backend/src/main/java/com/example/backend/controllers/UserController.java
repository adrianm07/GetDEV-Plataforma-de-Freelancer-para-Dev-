package com.example.backend.controllers;

import com.example.backend.dto.UserResponseDTO;
import com.example.backend.dto.UserUpdateRequest;
import com.example.backend.model.user.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/users")

public class UserController {

    private final UserService userService;

    public UserController(UserService userService){this.userService=userService;}

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUser(@PathVariable UUID id, @RequestBody UserUpdateRequest request) {
        userService.update(id,request);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable UUID id){
        return ResponseEntity.ok(userService.getUser(id));
    }

}
