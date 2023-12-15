package com.vtd.chatwebapp.entity.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class RegisterRequest {
    @NotBlank
    private String realName;
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
