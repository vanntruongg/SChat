package com.vtd.chatwebapp.controller;

import com.vtd.chatwebapp.common.CommonResponse;
import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.entity.dto.LoginRequest;
import com.vtd.chatwebapp.entity.dto.RefreshTokenRequest;
import com.vtd.chatwebapp.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.vtd.chatwebapp.constant.ApiEndpoint.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(AUTH_ENDPOINT)
public class AuthController {
    private final AuthService authService;

    @PostMapping(LOGIN)
    public ResponseEntity<CommonResponse<Object>> login(@RequestBody  @Valid LoginRequest requestLogin) {
        try {
            return ResponseEntity.ok().body(CommonResponse.builder()
                    .isSuccess(true)
                    .message(MessageConstant.LOGIN_SUCCESS)
                    .data(authService.login(requestLogin))
                    .build());
        } catch (InternalAuthenticationServiceException | DisabledException | BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.builder()
                    .isSuccess(false)
                    .message(ex.getMessage())
                    .build());
        }
    }

    @PostMapping(LOGOUT)
    public ResponseEntity<CommonResponse<Object>> logout(HttpServletRequest request, HttpServletResponse response) {
        if(authService.logout(request, response)) {
            return ResponseEntity.ok().body(CommonResponse.builder()
                    .isSuccess(true)
                    .message(MessageConstant.LOGOUT_SUCCESS)
                    .build());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.builder().isSuccess(false).build());
    }

    @PostMapping(REFRESH_TOKEN)
    public ResponseEntity<CommonResponse<Object>> refreshToken(@RequestBody @Valid RefreshTokenRequest refreshTokenRequest) {
        try {
            return ResponseEntity.ok().body(CommonResponse.builder().isSuccess(true).data(authService.refreshToken(refreshTokenRequest)).build());
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.builder().isSuccess(false).message(MessageConstant.REFRESH_TOKEN_FAIL).build());
        }
    }
}
