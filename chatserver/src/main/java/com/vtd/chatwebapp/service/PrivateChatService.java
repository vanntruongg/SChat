package com.vtd.chatwebapp.service;

import com.vtd.chatwebapp.entity.PrivateChat;
import com.vtd.chatwebapp.entity.dto.ChatResponse;

import java.util.List;

public interface PrivateChatService {
  PrivateChat getOrCreatePrivateChat(Long user1Id, Long user2Id);

  List<ChatResponse<PrivateChat>> getAllPrivateChat(Long userId);
}
