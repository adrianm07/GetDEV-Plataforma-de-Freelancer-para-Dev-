package com.example.backend.controllers;

import com.example.backend.dto.UserUpdateRequest;
import com.example.backend.model.user.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")

public class UserController {

    private final UserService userService;

    public UserController(UserService userService){this.userService=userService;}

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUser(@PathVariable UUID id, @RequestBody UserUpdateRequest request) {
        userService.update(id,request);
        return ResponseEntity.ok().build();
    }

}
