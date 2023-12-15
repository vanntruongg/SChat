package com.vtd.chatwebapp.entity.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UserDto {
    private Long userId;
    private String userName;
    private String email;
}
