package com.vtd.chatwebapp.controller;

import com.vtd.chatwebapp.common.CommonResponse;
import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import static com.vtd.chatwebapp.constant.ApiEndpoint.CHATS_GROUP;
import static com.vtd.chatwebapp.constant.ApiEndpoint.CHATS_PRIVATE;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final GroupService groupService;


    @GetMapping(CHATS_PRIVATE)
    public ResponseEntity<CommonResponse<Object>> getAllPrivateChat(@PathVariable("id") Long userId) {
        return ResponseEntity.ok().body(CommonResponse.builder()
                .isSuccess(true)
                .message(MessageConstant.FIND_SUCCESS)
                .data(groupService.getAllPrivateChat(userId))
                .build());
    }

    @GetMapping(CHATS_GROUP)
    public ResponseEntity<CommonResponse<Object>> getAllGroupChat(@PathVariable("id") Long userId) {
        return ResponseEntity.ok().body(CommonResponse.builder()
                .isSuccess(true)
                .message(MessageConstant.FIND_SUCCESS)
                .data(groupService.getAllGroupChat(userId))
                .build());
    }
}
