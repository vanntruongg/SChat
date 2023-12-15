package com.vtd.chatwebapp.service.impl;

import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.entity.dto.LoginRequest;
import com.vtd.chatwebapp.entity.dto.LoginResponse;
import com.vtd.chatwebapp.entity.dto.RefreshTokenRequest;
import com.vtd.chatwebapp.repository.UserRepository;
import com.vtd.chatwebapp.security.JwtService;
import com.vtd.chatwebapp.security.UserDetailsImpl;
import com.vtd.chatwebapp.security.UserDetailsServiceImpl;
import com.vtd.chatwebapp.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;
    private final UserRepository userRepository;
    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        return handleLogin(loginRequest.getEmail(), loginRequest.getPassword());
    }

    private LoginResponse handleLogin(String email, String password) {
           var authentication = authenticationManager.authenticate(
                   new UsernamePasswordAuthenticationToken(email, password)
           );
           SecurityContextHolder.getContext().setAuthentication(authentication);
           UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

           String accessToken = jwtService.generateAccessToken(userDetails);
           String refreshToken = jwtService.generateRefreshToken(userDetails);

           return LoginResponse.builder()
                   .accessToken(accessToken)
                   .refreshToken(refreshToken)
                   .build();
    }

    @Override
    public boolean logout(HttpServletRequest request, HttpServletResponse response) {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            return false;
        }
        UserDetailsImpl userDetail = (UserDetailsImpl) auth.getPrincipal();;
        if (userDetail != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
            SecurityContextHolder.getContext().setAuthentication(null);
            auth.setAuthenticated(false);
            return true;
        }
        return false;
    }

    @Override
    public LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String refreshToken = refreshTokenRequest.getRefreshToken();
        if (!jwtService.validateToken(refreshToken)) {
            throw new BadCredentialsException("Invalid refresh token!");
        }
        String email = jwtService.getEmailFromToken(refreshToken);
        UserDetailsImpl userDetail = (UserDetailsImpl) userDetailsService.loadUserByUsername(email);

        String accessToken = jwtService.generateAccessToken(userDetail);
        return LoginResponse.builder().accessToken(accessToken).build();
    }

}
