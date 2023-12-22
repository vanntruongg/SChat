package com.vtd.chatwebapp.service.impl;

import com.vtd.chatwebapp.entity.Group;
import com.vtd.chatwebapp.entity.GroupMember;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.enums.GroupRole;
import com.vtd.chatwebapp.repository.GroupMemberRepository;
import com.vtd.chatwebapp.service.GroupMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupMemberServiceImpl implements GroupMemberService {
    private final GroupMemberRepository groupMemberRepository;
    @Override
    public GroupMember createGroupMember(Group group, User user, GroupRole role) {
        GroupMember groupMember = new GroupMember();
        groupMember.setGroup(group);
        groupMember.setUser(user);
        groupMember.setRole(role);
        return groupMemberRepository.save(groupMember);
    }
}
