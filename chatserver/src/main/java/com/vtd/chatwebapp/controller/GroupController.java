package com.vtd.chatwebapp.controller;

import com.vtd.chatwebapp.common.CommonResponse;
import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.entity.dto.GroupDto;
import com.vtd.chatwebapp.service.GroupMemberService;
import com.vtd.chatwebapp.service.GroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.vtd.chatwebapp.constant.ApiEndpoint.*;

@RestController
@RequiredArgsConstructor
public class GroupController {

  private final GroupService groupService;

  @PostMapping(GROUP_CREATE)
  public ResponseEntity<CommonResponse<Object>> createGroup(@RequestBody @Valid GroupDto groupDto) {
    return ResponseEntity.ok().body(CommonResponse.builder()
            .isSuccess(true)
            .message(MessageConstant.CREATE_GROUP_SUCCESS)
            .data(groupService.createGroup(groupDto))
            .build());
  }


  @GetMapping(GROUPS_JOINED)
  public ResponseEntity<CommonResponse<Object>> getAllGroupsJoined(@PathVariable("id") Long userId) {
    return ResponseEntity.ok().body(CommonResponse.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(groupService.getAllGroupsJoined(userId))
            .build());
  }

  @GetMapping(GROUPS_NOT_JOINED)
  public ResponseEntity<CommonResponse<Object>> getAllGroupsNotJoined(@PathVariable("id") Long userId) {
    return ResponseEntity.ok().body(CommonResponse.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(groupService.getAllGroupsNotJoined(userId))
            .build());
  }

}
