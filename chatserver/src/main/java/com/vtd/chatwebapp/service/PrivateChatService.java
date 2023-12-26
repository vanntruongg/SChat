package com.vtd.chatwebapp.service;

import com.vtd.chatwebapp.entity.PrivateChat;
import com.vtd.chatwebapp.entity.dto.PrivateChatResponse;

import java.util.List;
import java.util.Optional;

public interface PrivateChatService {
  Optional<PrivateChat> getOrCreatePrivateChat(Long user1Id, Long user2Id);

  List<PrivateChatResponse> getAllPrivateChat(Long userId);

  boolean deletePrivateChatByUser(Long userId, int chatId);

  Integer getIdPrivateChat(Long user1Id, Long user2Id);
}
