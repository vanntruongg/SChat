package com.vtd.chatwebapp.controller;

import com.vtd.chatwebapp.common.CommonResponse;
import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.entity.dto.FriendDto;
import com.vtd.chatwebapp.entity.dto.RegisterRequest;
import com.vtd.chatwebapp.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.vtd.chatwebapp.constant.ApiEndpoint.*;

@RestController
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @GetMapping(USER_GET_ALL)
  public ResponseEntity<CommonResponse<Object>> getAllUser() {
    return ResponseEntity.ok().body(CommonResponse.builder()
            .isSuccess(true)
            .message(MessageConstant.REGISTER_SUCCESS)
            .data(userService.getAll())
            .build());
  }

  @PostMapping(USER_CREATE)
  public ResponseEntity<CommonResponse<Object>> createUser(@RequestBody @Valid RegisterRequest registerRequest) {
    return ResponseEntity.ok().body(CommonResponse.builder()
            .isSuccess(true)
            .message(MessageConstant.REGISTER_SUCCESS)
            .data(userService.createUser(registerRequest))
            .build());
  }

  @GetMapping(USER_GET_BY_ID)
  public ResponseEntity<CommonResponse<Object>> getUserById(@PathVariable("id") Long userId) {
    return ResponseEntity.ok().body(CommonResponse.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(userService.getUserById(userId))
            .build());
  }

  @GetMapping(USER_GET_BY_EMAIL)
  public ResponseEntity<CommonResponse<Object>> getUserByEmail(@PathVariable("email") String email) {
    return ResponseEntity.ok().body(CommonResponse.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(userService.getUserByEmail(email))
            .build());
  }

  @GetMapping(USER_GET_ALL_NOT_FRIEND)
  public ResponseEntity<CommonResponse<Object>> getAllUserNotFriend(@PathVariable("id") Long userId) {
    return ResponseEntity.ok().body(CommonResponse.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(userService.getAllUserNotFriend(userId))
            .build());
  }


  @GetMapping(USER_GET_AND_FRIEND_STATUS)
  public ResponseEntity<CommonResponse<Object>> getUserAndFriendStatusById(@RequestParam("senderId") Long senderId, @RequestParam("receiverId") Long receiverId) {
    return ResponseEntity.ok().body(CommonResponse.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(userService.getUserAndFriendStatusById(senderId, receiverId))
            .build());
  }


}
