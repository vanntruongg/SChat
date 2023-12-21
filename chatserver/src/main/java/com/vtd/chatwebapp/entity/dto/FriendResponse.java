package com.vtd.chatwebapp.entity.dto;

import com.vtd.chatwebapp.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendResponse {
    private Integer friendId;
    private User friend;
}
