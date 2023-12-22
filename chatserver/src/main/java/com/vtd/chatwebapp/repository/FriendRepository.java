package com.vtd.chatwebapp.repository;

import com.vtd.chatwebapp.entity.Friend;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.enums.FriendRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Integer> {

    @Query("select f from Friend f where (f.sender.userId = :user1Id and f.receiver.userId = :user2Id) " +
            "or (f.sender.userId = :user2Id and f.receiver.userId = :user1Id)")
    Optional<Friend> findBySenderOrReceiver(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);

    @Query("select f from Friend f " +
            "where f.sender.userId = :userId and f.status = com.vtd.chatwebapp.enums.FriendRequestStatus.PENDING")
    List<Friend> findAllFriendRequestSent(@Param("userId") Long userId);

    @Query("select f from Friend f " +
            "where f.receiver.userId = :userId and f.status = com.vtd.chatwebapp.enums.FriendRequestStatus.PENDING")
    List<Friend> findAllFriendRequestReceived(@Param("userId") Long userId);

    @Query("select f from Friend f " +
            "where (f.sender.userId = :userId or f.receiver.userId = :userId) and f.status = com.vtd.chatwebapp.enums.FriendRequestStatus.ACCEPTED")
    List<Friend> findAllFriend(@Param("userId") Long userId);

}
