package com.vtd.chatwebapp.entity.dto;

import lombok.Getter;

@Getter
public class PrivateMessageDto {
    private Long senderId;
    private Long receiverId;
    private Integer privateChatId;
    private String content;
}
