package com.vtd.chatwebapp.service.impl;

import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.entity.Chat;
import com.vtd.chatwebapp.entity.Message;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.entity.dto.MessageDto;
import com.vtd.chatwebapp.exception.ErrorCode;
import com.vtd.chatwebapp.exception.NotFoundException;
import com.vtd.chatwebapp.repository.ChatRepository;
import com.vtd.chatwebapp.repository.MessageRepository;
import com.vtd.chatwebapp.repository.UserRepository;
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
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    @Override
    public List<Message> getAllMessageByChatId(int chatId) {
        Optional<Chat> chat = chatRepository.findById(chatId);
        if (chat.isPresent()) {
            return messageRepository.findAllByChat(chat.get());
        }
        return Collections.emptyList();
    }

    @Override
    @Transactional
    public Message saveMessage(MessageDto messageDto) {
        try {
            User user = userRepository.findById(messageDto.getSenderId())
                    .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));
            Chat chat = chatRepository.findById(messageDto.getChatId())
                    .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.CHAT));

            Message message = new Message();
            message.setUser(user);
            message.setChat(chat);
            message.setContent(messageDto.getContent());
            message.setSentAt(new Timestamp(System.currentTimeMillis()));

            return messageRepository.save(message);
        } catch (NotFoundException ex) {
            throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND, ex.getCause());
        }
    }
}
