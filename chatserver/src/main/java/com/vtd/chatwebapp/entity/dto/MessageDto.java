package com.vtd.chatwebapp.entity.dto;

import lombok.Getter;

@Getter
public class MessageDto {
    private Long senderId;
//    private Long receiverId;
    private Integer privateChatId;
    private Integer groupId;
    private String content;
}
