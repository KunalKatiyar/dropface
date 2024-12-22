package com.typeface.dropface.service;

import com.typeface.dropface.auth.AuthRequest;
import com.typeface.dropface.auth.AuthResponse;
import com.typeface.dropface.model.User;
import com.typeface.dropface.repository.UserRepository;
import com.typeface.dropface.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // Logins or Register the user and return a JWT token
    public AuthResponse loginOrRegister(AuthRequest request) {
        // Try to find the user by email
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            // If the user doesn't exist, create a new user
            user = User.builder()
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .build();
            userRepository.save(user);
        } else {
            // If the user exists, authenticate
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        }

        // Generate a JWT token
        String token = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .build();
    }
}
