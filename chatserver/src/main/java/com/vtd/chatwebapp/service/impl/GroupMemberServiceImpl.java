package com.vtd.chatwebapp.service.impl;

import com.vtd.chatwebapp.entity.GroupMember;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.repository.GroupMemberRepository;
import com.vtd.chatwebapp.repository.UserRepository;
import com.vtd.chatwebapp.service.GroupMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupMemberServiceImpl implements GroupMemberService {
    private final GroupMemberRepository groupMemberRepository;
    private final UserRepository userRepository;

    @Override
    public List<GroupMember> getAllGroupsNotJoined(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return groupMemberRepository.findAllByUserNot(user.get());
        }
        return Collections.emptyList();
    }

    @Override
    public List<GroupMember> getAllGroupsJoined(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return groupMemberRepository.findAllByUser(user.get());
        }
        return Collections.emptyList();
    }
}
