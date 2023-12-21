package com.vtd.chatwebapp.service;

import com.vtd.chatwebapp.entity.Message;
import com.vtd.chatwebapp.entity.dto.MessageDto;

import java.util.List;

public interface MessageService {
    List<Message> getAllMessageByChatId(int chatId);

    Message saveMessage(MessageDto messageDto);
}
