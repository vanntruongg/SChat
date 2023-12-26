package com.vtd.chatwebapp.service.impl;

import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.entity.Group;
import com.vtd.chatwebapp.entity.Message;
import com.vtd.chatwebapp.entity.PrivateChat;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.entity.dto.MessageResponse;
import com.vtd.chatwebapp.entity.dto.PrivateMessageDto;
import com.vtd.chatwebapp.enums.SocketEvent;
import com.vtd.chatwebapp.exception.ErrorCode;
import com.vtd.chatwebapp.exception.NotFoundException;
import com.vtd.chatwebapp.repository.GroupRepository;
import com.vtd.chatwebapp.repository.MessageRepository;
import com.vtd.chatwebapp.repository.PrivateChatRepository;
import com.vtd.chatwebapp.repository.UserRepository;
import com.vtd.chatwebapp.service.MessageService;
import com.vtd.chatwebapp.service.PrivateChatService;
import com.vtd.chatwebapp.socket.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
  private final MessageRepository messageRepository;
  private final GroupRepository groupRepository;
  private final UserRepository userRepository;
  private final NotificationService notificationService;
  private final PrivateChatRepository privateChatRepository;
  private final PrivateChatService privateChatService;

  @Override
  public List<Message> getAllMessageByChatId(int chatId) {
    Optional<PrivateChat> privateChat = privateChatRepository.findById(chatId);
    if (privateChat.isPresent()) {
      return messageRepository.findAllByPrivateChat(privateChat.get());
    } else {
      Optional<Group> group = groupRepository.findById(chatId);
      if (group.isPresent()) {
        return messageRepository.findAllByGroup(group.get());
      }
    }
    return Collections.emptyList();
  }

  @Override
  @Transactional
  public MessageResponse savePrivateMessage(PrivateMessageDto messageDto) {
    try {
      Message message = Message.builder()
              .content(messageDto.getContent())
              .sentAt(new Timestamp(System.currentTimeMillis()))
              .build();
      setUserIfPresent(message, messageDto.getSenderId());

      if (messageDto.getPrivateChatId() != null) {
        privateChatRepository.findById(messageDto.getPrivateChatId())
                .ifPresent(message::setPrivateChat);
      } else {
        privateChatService.getOrCreatePrivateChat(messageDto.getSenderId(), messageDto.getReceiverId())
                .ifPresent(message::setPrivateChat);
      }

      Message saveMessage = messageRepository.save(message);

      notificationService.sendNotificationNewMessage(message, messageDto.getReceiverId());

      return setMessageResponseFromMessage(saveMessage);
    } catch (NotFoundException ex) {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND, ex.getCause());
    }
  }
  private void setUserIfPresent(Message message, Long userId) {
    userRepository.findById(userId).ifPresent(message::setUser);
  }

  private MessageResponse setMessageResponseFromMessage(Message message) {
    return MessageResponse.builder()
            .messageId(message.getMessageId())
            .user(message.getUser())
            .chatId(message.getPrivateChat().getPrivateChatId())
            .content(message.getContent())
            .sentAt(message.getSentAt())
            .build();
  }

}
