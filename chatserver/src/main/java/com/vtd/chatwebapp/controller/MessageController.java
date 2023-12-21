package com.vtd.chatwebapp.controller;

import com.vtd.chatwebapp.common.CommonResponse;
import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import static com.vtd.chatwebapp.constant.ApiEndpoint.MESSAGE_GET_ALL_BY_CHAT_ID;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;

    @GetMapping(MESSAGE_GET_ALL_BY_CHAT_ID)
    public ResponseEntity<CommonResponse<Object>> getAllMessageByChatId(@PathVariable("id") int chatId) {
        return ResponseEntity.ok().body(CommonResponse.builder()
                .isSuccess(true)
                .message(MessageConstant.FIND_SUCCESS)
                .data(messageService.getAllMessageByChatId(chatId))
                .build());
    }
}
