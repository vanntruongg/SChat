package com.vtd.chatwebapp.entity.dto;

import lombok.Getter;

@Getter
public class MessageDto {
    private Long senderId;
    private int chatId;
    private String content;
}
