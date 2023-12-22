package com.vtd.chatwebapp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TypeMessage {
    PRIVATE("Private"),
    GROUP("Group");

    private String type;

}
