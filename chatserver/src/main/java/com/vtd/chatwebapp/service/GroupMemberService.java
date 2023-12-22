package com.vtd.chatwebapp.service;

import com.vtd.chatwebapp.entity.Group;
import com.vtd.chatwebapp.entity.GroupMember;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.enums.GroupRole;

public interface GroupMemberService {
    GroupMember createGroupMember(Group group, User user, GroupRole role);
}
