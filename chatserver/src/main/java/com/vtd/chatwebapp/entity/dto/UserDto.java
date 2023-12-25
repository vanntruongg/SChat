package com.vtd.chatwebapp.entity.dto;

import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.enums.FriendStatus;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private User user;
    private FriendStatus friendStatus;
    private int friendId;
    private boolean isSender;
}
