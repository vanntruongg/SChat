package com.vtd.chatwebapp.entity.dto;

import com.vtd.chatwebapp.entity.Chat;
import com.vtd.chatwebapp.entity.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserChatResponse {
    private int userChatId;
    private User user;
    private Chat chat;

}
