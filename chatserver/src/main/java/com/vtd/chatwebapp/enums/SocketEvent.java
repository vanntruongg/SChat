package com.vtd.chatwebapp.enums;

import lombok.Getter;

@Getter
public enum SocketEvent {
    SEND_MESSAGE("send_message"),
    READ_MESSAGE("read_message"),
    NOTIFICATION_FRIEND_REQUEST("notification_friend_request"),
    NOTIFICATION_ACCEPTED_FRIEND_REQUEST("notification_accepted_friend_request"),
    NOTIFICATION_UNSENT_FRIEND_REQUEST("notification_unsent_friend_request"),
    NOTIFICATION_DELETE_FRIEND_REQUEST("notification_delete_friend_request");

    private String event;

    SocketEvent(String event) {
        this.event = event;
    }

}
