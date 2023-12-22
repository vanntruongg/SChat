package com.vtd.chatwebapp.entity.dto;

import com.vtd.chatwebapp.entity.Group;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.enums.GroupRole;
import lombok.Getter;

@Getter
public class GroupMemberDto {
    private Group group;
    private User user;
    private GroupRole role;
}
