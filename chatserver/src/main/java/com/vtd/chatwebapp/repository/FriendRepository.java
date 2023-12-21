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

    Optional<Friend> findBySenderAndReceiverAndStatus(User sender, User receiver, FriendRequestStatus status);

    @Query("select f from Friend f " +
            "where (f.sender.userId = :userId or f.receiver.userId = :userId) and f.status = com.vtd.chatwebapp.enums.FriendRequestStatus.PENDING")
    List<Friend> findAllFriendRequest(@Param("userId") Long userId);

    @Query("select f from Friend f " +
            "where (f.sender.userId = :userId or f.receiver.userId = :userId) and f.status = com.vtd.chatwebapp.enums.FriendRequestStatus.ACCEPTED")
    List<Friend> findAllFriend(@Param("userId") Long userId);

}
