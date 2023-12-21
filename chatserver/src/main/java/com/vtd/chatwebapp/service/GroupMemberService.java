package com.vtd.chatwebapp.service;

import com.vtd.chatwebapp.entity.GroupMember;

import java.util.List;

public interface GroupMemberService {

    List<GroupMember> getAllGroupsNotJoined(Long userId);

    List<GroupMember> getAllGroupsJoined(Long userId);
}
