package com.vtd.chatwebapp.repository;

import com.vtd.chatwebapp.entity.GroupMember;
import com.vtd.chatwebapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupMemberRepository  extends JpaRepository<GroupMember, Integer> {
    List<GroupMember> findAllByUser(User user);
    List<GroupMember> findAllByUserNot(User user);
}
