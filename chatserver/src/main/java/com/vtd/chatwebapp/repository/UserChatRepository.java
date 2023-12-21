package com.vtd.chatwebapp.repository;

import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.entity.UserChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserChatRepository extends JpaRepository<UserChat, Integer> {
    @Query("select uc from UserChat uc where uc.sender.userId = :userId or uc.receiver.userId = :userId")
    List<UserChat> findAllBySenderOrReceiver(@Param("userId") Long userId);
}
