package com.vtd.chatwebapp.service.impl;

import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.entity.Message;
import com.vtd.chatwebapp.entity.PrivateChat;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.entity.dto.PrivateChatResponse;
import com.vtd.chatwebapp.exception.ErrorCode;
import com.vtd.chatwebapp.exception.NotFoundException;
import com.vtd.chatwebapp.repository.MessageRepository;
import com.vtd.chatwebapp.repository.PrivateChatRepository;
import com.vtd.chatwebapp.repository.UserRepository;
import com.vtd.chatwebapp.service.PrivateChatService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrivateChatServiceImpl implements PrivateChatService {
  private final PrivateChatRepository privateChatRepository;
  private final UserRepository userRepository;
  private final MessageRepository messageRepository;

  @Override
  public Optional<PrivateChat> getOrCreatePrivateChat(Long user1Id, Long user2Id) {
    return privateChatRepository.findBySenderIdAndReceiverId(user1Id, user2Id)
            .map(Optional::of)
            .orElseGet(() -> {
              User sender = userRepository.findById(user1Id)
                      .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));
              User receiver = userRepository.findById(user2Id)
                      .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));

              PrivateChat privateChat = PrivateChat.builder()
                      .sender(sender)
                      .receiver(receiver)
                      .build();

              PrivateChat savedPrivateChat = privateChatRepository.save(privateChat);
              return Optional.of(savedPrivateChat);
            });
  }

  @Override
  public List<PrivateChatResponse> getAllPrivateChat(Long userId) {
    List<PrivateChat> privateChatList = privateChatRepository.findAllByUserId(userId);

    return privateChatList.stream()
            .map(privateChat -> {
              Message lastMessage = messageRepository.findLastMessageByPrivateChatId(privateChat.getPrivateChatId());
              PrivateChatResponse privateChatResponse = new PrivateChatResponse();
              privateChatResponse.setPrivateChatId(privateChat.getPrivateChatId());
              privateChatResponse.setReceiver(userId.equals(privateChat.getSender().getUserId()) ? privateChat.getReceiver() : privateChat.getSender());
              privateChatResponse.setLastMessage(lastMessage);
              return privateChatResponse;
            })
            .collect(Collectors.toList());
  }

  @Override
  @Transactional
  public boolean deletePrivateChatByUser(Long userId, int chatId) {
    try {
      PrivateChat privateChat = privateChatRepository.findById(chatId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.CHAT_NOT_FOUND));

      if (privateChat.getUserDeleted() == null) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));
        privateChat.setUserDeleted(user);
        privateChatRepository.save(privateChat);
      } else {
        privateChatRepository.delete(privateChat);
      }
      return true;
    } catch (NotFoundException ex) {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND, ex.getCause());
    }
  }

  @Override
  public Integer getIdPrivateChat(Long user1Id, Long user2Id) {
    Optional<PrivateChat> privateChat = privateChatRepository.findBySenderIdAndReceiverId(user1Id, user2Id);
    if(privateChat.isPresent()) {
      return privateChat.get().getPrivateChatId();
    }
    return null;
  }
}














