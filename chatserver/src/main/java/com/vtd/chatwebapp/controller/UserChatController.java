package com.vtd.chatwebapp.controller;

import com.vtd.chatwebapp.common.CommonResponse;
import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.service.UserChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import static com.vtd.chatwebapp.constant.ApiEndpoint.USER_GET_ALL_CHAT;

@RestController
@RequiredArgsConstructor
public class UserChatController {
    private final UserChatService userCharService;

    @GetMapping(USER_GET_ALL_CHAT)
    public ResponseEntity<CommonResponse<Object>> getAllChat(@PathVariable("id") Long userId) {
        return ResponseEntity.ok().body(CommonResponse.builder()
                .isSuccess(true)
                .message(MessageConstant.FIND_SUCCESS)
                .data(userCharService.getAllChat(userId))
                .build());
    }
}
