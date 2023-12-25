package com.vtd.chatwebapp.enums;

import lombok.Getter;

@Getter
public enum SocketEvent {
    SEND_MESSAGE("send_message"),
    READ_MESSAGE("read_message"),
    NEW_MESSAGE("new_message"),
    NEW_FRIEND("new_friend"),
    NOTIFICATION("notification");

    private String event;

    SocketEvent(String event) {
        this.event = event;
    }

}
