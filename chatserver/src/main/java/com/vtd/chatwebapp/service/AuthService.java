package com.vtd.chatwebapp.service;

import com.vtd.chatwebapp.entity.dto.LoginRequest;
import com.vtd.chatwebapp.entity.dto.LoginResponse;
import com.vtd.chatwebapp.entity.dto.RefreshTokenRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);

    boolean logout(HttpServletRequest request, HttpServletResponse response);

    LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
