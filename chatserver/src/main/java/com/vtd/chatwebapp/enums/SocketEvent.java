package com.vtd.chatwebapp.enums;

import lombok.Getter;

@Getter
public enum SocketEvent {
    SEND_PRIVATE_MESSAGE("send_private_message"),
    READ_PRIVATE_MESSAGE("read_private_message"),
    SEND_GROUP_MESSAGE("send_group_message"),
    READ_GROUP_MESSAGE("read_group_message"),
    NEW_MESSAGE("new_message"),
    NEW_FRIEND("new_friend"),
    NOTIFICATION("notification");

    private final String event;

    SocketEvent(String event) {
        this.event = event;
    }

}
