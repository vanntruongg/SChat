package com.vtd.chatwebapp.service;


import com.vtd.chatwebapp.entity.Friend;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.entity.dto.FriendResponse;
import com.vtd.chatwebapp.entity.dto.RegisterRequest;

import java.util.List;

public interface UserService {
    boolean createUser(RegisterRequest registerRequest);

    User getUserByEmail(String email);

    List<User> getAll();

    List<User> getAllUserNotFriend(Long userId);

    User getUserById(Long userId);

    void setStatusUser(String email, boolean isOnline);
}
