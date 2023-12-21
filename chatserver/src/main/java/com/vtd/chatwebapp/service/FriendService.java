package com.vtd.chatwebapp.service;


import com.vtd.chatwebapp.entity.dto.FriendDto;
import com.vtd.chatwebapp.entity.dto.FriendResponse;
import com.vtd.chatwebapp.enums.ConnectionStatus;

import java.util.List;

public interface FriendService {
    boolean friendRequest(FriendDto friendDto);

    List<FriendResponse> getAllFriend(Long userId);

    List<FriendResponse> getAllFriendRequest(Long userId, ConnectionStatus status);

    boolean cancelOrDeleteFriendRequest(int friendId);

}
