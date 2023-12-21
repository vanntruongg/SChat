package com.vtd.chatwebapp.enums;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FriendRequestStatus {
    PENDING("Pending"),
    ACCEPTED("Accepted");
    private final String status;
}
