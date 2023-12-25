package com.vtd.chatwebapp.repository;

import com.vtd.chatwebapp.entity.Group;
import com.vtd.chatwebapp.entity.Message;
import com.vtd.chatwebapp.entity.PrivateChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
  List<Message> findAllByPrivateChat(PrivateChat privateChat);

  List<Message> findAllByGroup(Group group);

  @Query("select m from Message m where m.privateChat.privateChatId = :privateChatId order by m.sentAt desc limit 1")
  Message findLastMessageByPrivateChatId(@Param("privateChatId") int privateChatId);
}