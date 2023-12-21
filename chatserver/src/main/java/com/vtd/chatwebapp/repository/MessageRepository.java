package com.vtd.chatwebapp.repository;

import com.vtd.chatwebapp.entity.Chat;
import com.vtd.chatwebapp.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

    List<Message> findAllByChat(Chat chat);
}
