package com.vtd.chatwebapp.repository;

import com.vtd.chatwebapp.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Integer> {

    @Query("select g from Group g " +
            "where :userId in (select gm.user.userId from GroupMember gm)")
    List<Group> findAllGroupJoinedByUserId(@Param("userId") Long userId);

    @Query("select g from Group g " +
            "where :userId not in (select gm.user.userId from GroupMember gm)")
    List<Group> findAllGroupNotJoinedByUserId(Long userId);

}
