package com.example.backend.security;

import com.example.backend.model.user.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.security.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getRequestURI();
        System.out.println("Path: " + path);

        // 🔓 LIBERA ROTAS DE AUTENTICAÇÃO
        if (path.startsWith("/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 🔓 LIBERA PREFLIGHT (CORS)
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        var token = recoverToken(request);
        System.out.println("Token recebido: " + token);

        if (token == null) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return;
        }

        var login = tokenService.validateToken(token);
        System.out.println("Token validado. Login/email: " + login);
        if (login == null) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return;
        }

        User user = userRepository.findByEmail(login)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        var authorities = List.of(
                new SimpleGrantedAuthority("ROLE_" + user.getRole())
        );

        var authentication = new UsernamePasswordAuthenticationToken(
                user,
                null,
                authorities
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}
