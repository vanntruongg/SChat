package com.vtd.chatwebapp.service;


import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.entity.dto.RegisterRequest;

import java.util.List;

public interface UserService {
    boolean createUser(RegisterRequest registerRequest);

    User getUserByEmail(String email);

    List<User> getAllFriend(String email);

    List<User> getAll();
}
