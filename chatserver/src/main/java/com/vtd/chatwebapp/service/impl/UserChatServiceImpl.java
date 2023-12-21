package com.vtd.chatwebapp.service.impl;

import com.vtd.chatwebapp.entity.UserChat;
import com.vtd.chatwebapp.entity.dto.UserChatResponse;
import com.vtd.chatwebapp.repository.UserChatRepository;
import com.vtd.chatwebapp.service.UserChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserChatServiceImpl implements UserChatService {

    private final UserChatRepository userChatRepository;
    @Override
    public List<UserChatResponse> getAllChat(Long userId) {
        List<UserChat> userChatList = userChatRepository.findAllBySenderOrReceiver(userId);
        List<UserChatResponse> userChatResponseList = new ArrayList<>();
        for (UserChat userChat : userChatList) {
            UserChatResponse userChatResponse = new UserChatResponse();
            userChatResponse.setUserChatId(userChat.getUserChatId());
            userChatResponse.setChat(userChat.getChat());
            if (userId.equals(userChat.getSender().getUserId())) {
                userChatResponse.setUser(userChat.getReceiver());
            } else {
                userChatResponse.setUser(userChat.getSender());
            }
            userChatResponseList.add(userChatResponse);
        }
        return userChatResponseList;
    }
}
