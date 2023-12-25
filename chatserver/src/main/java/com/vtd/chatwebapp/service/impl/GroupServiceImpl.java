package com.vtd.chatwebapp.service.impl;

import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.entity.Group;
import com.vtd.chatwebapp.entity.GroupMember;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.entity.dto.GroupDto;
import com.vtd.chatwebapp.enums.GroupRole;
import com.vtd.chatwebapp.exception.ErrorCode;
import com.vtd.chatwebapp.exception.NotFoundException;
import com.vtd.chatwebapp.repository.GroupRepository;
import com.vtd.chatwebapp.repository.UserRepository;
import com.vtd.chatwebapp.service.GroupMemberService;
import com.vtd.chatwebapp.service.GroupService;
import com.vtd.chatwebapp.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {
  private final GroupRepository groupRepository;
  private final UserService userService;
  private final UserRepository userRepository;
  private final GroupMemberService groupMemberService;

  @Override
  @Transactional
  public boolean createGroup(GroupDto groupDto) {
    try {
      List<User> userList = userService.getAllUserByIds(groupDto.getUserIds());

      Group group = new Group();
      group.setGroupName(groupDto.getGroupName());
      Group groupSave = groupRepository.save(group);

      User leader = userRepository.findById(groupDto.getLeaderId()).orElseThrow(() ->
              new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));

      List<GroupMember> groupMemberList = new ArrayList<>();
      // add user is leader
      groupMemberList.add(groupMemberService.createGroupMember(groupSave, leader, GroupRole.LEADER));

      userList.forEach(user -> {
        // add all user is member
        groupMemberList.add(groupMemberService.createGroupMember(groupSave, user, GroupRole.MEMBER));
      });

      groupSave.setGroupMemberList(groupMemberList);
      groupRepository.save(groupSave);

      return true;
    } catch (Exception exception) {
      throw new RuntimeException("Failed to create group", exception);
    }
  }

  @Override
  public List<Group> getAllGroupsJoined(Long userId) {
    return groupRepository.findAllGroupJoinedByUserId(userId);
  }

  @Override
  public List<Group> getAllGroupsNotJoined(Long userId) {
    return groupRepository.findAllGroupNotJoinedByUserId(userId);
  }

}
