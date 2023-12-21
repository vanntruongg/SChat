package com.vtd.chatwebapp.service;


import com.vtd.chatwebapp.entity.UserChat;
import com.vtd.chatwebapp.entity.dto.UserChatResponse;

import java.util.List;

public interface UserChatService {
    List<UserChatResponse> getAllChat(Long userId);
}
