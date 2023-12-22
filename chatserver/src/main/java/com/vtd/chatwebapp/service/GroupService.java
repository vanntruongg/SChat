package com.vtd.chatwebapp.service;

import com.vtd.chatwebapp.entity.Group;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.entity.dto.GroupDto;

import java.util.List;

public interface GroupService {

    List<Group> getAllGroupsNotJoined(Long userId);

    List<Group> getAllGroupsJoined(Long userId);

    boolean createGroup(GroupDto groupDto);

    Group createPrivateChat(Long user1, Long user2);

    List<Group> getAllPrivateChat(Long userId);

    List<Group> getAllGroupChat(Long userId);
}
