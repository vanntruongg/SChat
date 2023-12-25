package com.vtd.chatwebapp.controller;

import com.vtd.chatwebapp.common.CommonResponse;
import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.service.GroupService;
import com.vtd.chatwebapp.service.PrivateChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.vtd.chatwebapp.constant.ApiEndpoint.*;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final GroupService groupService;
    private final PrivateChatService privateChatService;

    @PostMapping(GET_OR_CREATE_PRIVATE_CHAT)
    public ResponseEntity<CommonResponse<Object>> getOrCreatePrivateChat(@RequestParam("user1Id") Long user1Id, @RequestParam("user2Id") Long user2Id) {
        return ResponseEntity.ok().body(CommonResponse.builder()
                .isSuccess(true)
                .message(MessageConstant.CREATE_GROUP_SUCCESS)
                .data(privateChatService.getOrCreatePrivateChat(user1Id, user2Id))
                .build());
    }


    @GetMapping(CHATS_PRIVATE)
    public ResponseEntity<CommonResponse<Object>> getAllPrivateChat(@PathVariable("id") Long userId) {
        return ResponseEntity.ok().body(CommonResponse.builder()
                .isSuccess(true)
                .message(MessageConstant.FIND_SUCCESS)
                .data(privateChatService.getAllPrivateChat(userId))
                .build());
    }

//    @GetMapping(CHATS_GROUP)
//    public ResponseEntity<CommonResponse<Object>> getAllGroupChat(@PathVariable("id") Long userId) {
//        return ResponseEntity.ok().body(CommonResponse.builder()
//                .isSuccess(true)
//                .message(MessageConstant.FIND_SUCCESS)
//                .data(groupService.getAllGroupChat(userId))
//                .build());
//    }
}
