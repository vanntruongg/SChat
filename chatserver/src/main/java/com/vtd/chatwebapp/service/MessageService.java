package com.vtd.chatwebapp.service;

import com.vtd.chatwebapp.entity.Message;
import com.vtd.chatwebapp.entity.dto.MessageResponse;
import com.vtd.chatwebapp.entity.dto.PrivateMessageDto;

import java.util.List;

public interface MessageService {
    List<Message> getAllMessageByChatId(int chatId);

    MessageResponse savePrivateMessage(PrivateMessageDto messageDto);
}
