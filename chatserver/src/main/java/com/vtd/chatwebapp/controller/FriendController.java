package com.vtd.chatwebapp.controller;

import com.vtd.chatwebapp.common.CommonResponse;
import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.entity.dto.FriendDto;
import com.vtd.chatwebapp.enums.ConnectionStatus;
import com.vtd.chatwebapp.service.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.vtd.chatwebapp.constant.ApiEndpoint.*;

@RestController
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;

    @PostMapping(FRIEND_REQUEST)
    public ResponseEntity<CommonResponse<Object>> friendRequest(@RequestBody FriendDto friendDto) {
        return ResponseEntity.ok().body(CommonResponse.builder()
                        .isSuccess(true)
                        .message(MessageConstant.SENT_ADD_FRIEND_SUCCESS)
                        .data(friendService.friendRequest(friendDto))
                .build());
    }

    @PostMapping(CANCEL_FRIEND_REQUEST)
    public ResponseEntity<CommonResponse<Object>> cancelFriendRequest(@PathVariable("id") int friendId) {
        return ResponseEntity.ok().body(CommonResponse.builder()
                .isSuccess(true)
                .message(MessageConstant.SENT_CANCEL_FRIEND_SUCCESS)
                .data(friendService.cancelOrDeleteFriendRequest(friendId))
                .build());
    }

    @PostMapping(DELETE_FRIEND)
    public ResponseEntity<CommonResponse<Object>> deleteFriend(@PathVariable("id") int friendId) {
        return ResponseEntity.ok().body(CommonResponse.builder()
                .isSuccess(true)
                .message(MessageConstant.SENT_DELETE_FRIEND_SUCCESS)
                .data(friendService.cancelOrDeleteFriendRequest(friendId))
                .build());
    }

    @GetMapping(GET_ALL_FRIEND_BY_ID)
    public ResponseEntity<CommonResponse<Object>> getAllFriend(@PathVariable("id") Long userId) {
        return ResponseEntity.ok().body(CommonResponse.builder()
                .isSuccess(true)
                .message(MessageConstant.FIND_SUCCESS)
                .data(friendService.getAllFriend(userId))
                .build());
    }

    @GetMapping(FRIENDS_REQUEST_SENT)
    public ResponseEntity<CommonResponse<Object>> getAllFriendRequestSent(@PathVariable("id") Long userId) {
        return ResponseEntity.ok().body(CommonResponse.builder()
                .isSuccess(true)
                .message(MessageConstant.FIND_SUCCESS)
                .data(friendService.getAllFriendRequest(userId, ConnectionStatus.SENT))
                .build());
    }

    @GetMapping(FRIENDS_REQUEST_RECEIVED)
    public ResponseEntity<CommonResponse<Object>> getAllFriendRequestReceived(@PathVariable("id") Long userId) {
        return ResponseEntity.ok().body(CommonResponse.builder()
                .isSuccess(true)
                .message(MessageConstant.FIND_SUCCESS)
                .data(friendService.getAllFriendRequest(userId, ConnectionStatus.RECEIVED))
                .build());
    }
}
