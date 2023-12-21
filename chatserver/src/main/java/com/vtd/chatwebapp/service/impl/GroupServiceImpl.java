package com.vtd.chatwebapp.service.impl;

import com.vtd.chatwebapp.repository.GroupRepository;
import com.vtd.chatwebapp.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;

}
