package com.vtd.chatwebapp.controller;

import com.vtd.chatwebapp.common.CommonResponse;
import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.service.GroupMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import static com.vtd.chatwebapp.constant.ApiEndpoint.USER_GET_ALL_GROUPS_JOINED;
import static com.vtd.chatwebapp.constant.ApiEndpoint.USER_GET_ALL_NOT_JOINED_GROUPS;

@RestController
@RequiredArgsConstructor
public class GroupMemberController {

    private final GroupMemberService groupMemberService;

    @GetMapping(USER_GET_ALL_GROUPS_JOINED)
    public ResponseEntity<CommonResponse<Object>> getAllGroupsJoined(@PathVariable("id") Long userId) {
        return ResponseEntity.ok().body(CommonResponse.builder()
                .isSuccess(true)
                .message(MessageConstant.FIND_SUCCESS)
                .data(groupMemberService.getAllGroupsJoined(userId))
                .build());
    }

    @GetMapping(USER_GET_ALL_NOT_JOINED_GROUPS)
    public ResponseEntity<CommonResponse<Object>> getAllGroupsNotJoined(@PathVariable("id") Long userId) {
        return ResponseEntity.ok().body(CommonResponse.builder()
                .isSuccess(true)
                .message(MessageConstant.FIND_SUCCESS)
                .data(groupMemberService.getAllGroupsNotJoined(userId))
                .build());
    }
}
