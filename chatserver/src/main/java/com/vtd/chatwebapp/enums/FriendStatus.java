package com.vtd.chatwebapp.enums;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FriendStatus {
    PENDING("Pending"),
    ACCEPTED("Accepted"),
    NOT_FRIEND("Not a friend");
    private final String status;
}
