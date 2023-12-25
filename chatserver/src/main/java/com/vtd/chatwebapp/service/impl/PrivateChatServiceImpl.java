package com.vtd.chatwebapp.service.impl;

import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.entity.Message;
import com.vtd.chatwebapp.entity.PrivateChat;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.entity.dto.ChatResponse;
import com.vtd.chatwebapp.exception.ErrorCode;
import com.vtd.chatwebapp.exception.NotFoundException;
import com.vtd.chatwebapp.repository.MessageRepository;
import com.vtd.chatwebapp.repository.PrivateChatRepository;
import com.vtd.chatwebapp.repository.UserRepository;
import com.vtd.chatwebapp.service.PrivateChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PrivateChatServiceImpl implements PrivateChatService {
  private final PrivateChatRepository privateChatRepository;
  private final UserRepository userRepository;
  private final MessageRepository messageRepository;

  @Override
  public PrivateChat getOrCreatePrivateChat(Long user1Id, Long user2Id) {
    try {

      Optional<PrivateChat> existingPrivateChat = privateChatRepository.findBySenderIdAndReceiverId(user1Id, user2Id);

      return existingPrivateChat.orElseGet(() -> {

        User user1 = userRepository.findById(user1Id).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));
        User user2 = userRepository.findById(user2Id).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));

        PrivateChat privateChat = new PrivateChat();
        privateChat.setSender(user1);
        privateChat.setReceiver(user2);

        return privateChatRepository.save(privateChat);
      });


    } catch (NotFoundException exception) {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND, exception.getCause());
    }
  }

  @Override
  public List<ChatResponse<PrivateChat>> getAllPrivateChat(Long userId) {
    List<ChatResponse<PrivateChat>> listChatResponses = new ArrayList<>();
    List<PrivateChat> privateChatList = privateChatRepository.findAllByUserId(userId);

    privateChatList.forEach(privateChat -> {
      Message lastMessage = messageRepository.findLastMessageByPrivateChatId(privateChat.getPrivateChatId());
      ChatResponse<PrivateChat> chatChatResponse = new ChatResponse<PrivateChat>();
      chatChatResponse.setChat(privateChat);
      chatChatResponse.setLastMessage(lastMessage);
      listChatResponses.add(chatChatResponse);

    });
    return listChatResponses;
  }
}
