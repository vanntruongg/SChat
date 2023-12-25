package com.vtd.chatwebapp.repository;

import com.vtd.chatwebapp.entity.PrivateChat;
import com.vtd.chatwebapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PrivateChatRepository extends JpaRepository<PrivateChat, Integer> {

  @Query("select pc from PrivateChat pc " +
          "where (pc.sender.userId = :user1Id and pc.receiver.userId = :user2Id) or (pc.sender.userId = :user2Id and pc.receiver.userId = :user1Id)")
  Optional<PrivateChat> findBySenderIdAndReceiverId(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);

  @Query("select pc from PrivateChat pc " +
          "where pc.sender.userId = :userId or pc.receiver.userId = :userId")
  List<PrivateChat> findAllByUserId(@Param("userId") Long userId);
}
