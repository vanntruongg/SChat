package com.vtd.chatwebapp.service.impl;

import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.entity.Group;
import com.vtd.chatwebapp.entity.Message;
import com.vtd.chatwebapp.entity.PrivateChat;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.entity.dto.MessageDto;
import com.vtd.chatwebapp.exception.ErrorCode;
import com.vtd.chatwebapp.exception.NotFoundException;
import com.vtd.chatwebapp.repository.GroupRepository;
import com.vtd.chatwebapp.repository.MessageRepository;
import com.vtd.chatwebapp.repository.PrivateChatRepository;
import com.vtd.chatwebapp.repository.UserRepository;
import com.vtd.chatwebapp.service.GroupService;
import com.vtd.chatwebapp.service.MessageService;
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
    private final GroupService groupService;
    private final PrivateChatRepository privateChatRepository;

    @Override
    public List<Message> getAllMessageByChatId(int chatId) {
        Optional<PrivateChat> privateChat = privateChatRepository.findById(chatId);
        if(privateChat.isPresent()) {
            return messageRepository.findAllByPrivateChat(privateChat.get());
        } else {
            Optional<Group> group = groupRepository.findById(chatId);
            if(group.isPresent()) {
                return messageRepository.findAllByGroup(group.get());
            }
        }
        return Collections.emptyList();
    }

    @Override
    @Transactional
    public Message saveMessage(MessageDto messageDto) {
        try {
            User user = userRepository.findById(messageDto.getSenderId())
                    .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));
            Message message = Message.builder()
                    .user(user)
                    .content(messageDto.getContent())
                    .sentAt(new Timestamp(System.currentTimeMillis()))
                    .build();

            if (messageDto.getPrivateChatId() != null) {
                PrivateChat existingPrivateChat = privateChatRepository.findById(messageDto.getPrivateChatId())
                        .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND));
                message.setPrivateChat(existingPrivateChat);
            } else if (messageDto.getGroupId() != null) {
                Group group = groupRepository.findById(messageDto.getGroupId())
                        .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.CHAT_NOT_FOUND));
                message.setGroup(group);
            }

            return messageRepository.save(message);
        } catch (NotFoundException ex) {
            throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND, ex.getCause());
        }
    }
}
