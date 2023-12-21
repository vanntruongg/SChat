package com.vtd.chatwebapp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum GroupRole {
    LEADER("Leader"),
    MEMBER("Member");

    private String role;

}
