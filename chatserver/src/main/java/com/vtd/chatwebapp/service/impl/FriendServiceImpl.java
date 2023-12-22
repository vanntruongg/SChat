package com.vtd.chatwebapp.service.impl;

import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.entity.Friend;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.entity.dto.DeleteFriendDto;
import com.vtd.chatwebapp.entity.dto.FriendDto;
import com.vtd.chatwebapp.entity.dto.FriendResponse;
import com.vtd.chatwebapp.enums.ConnectionStatus;
import com.vtd.chatwebapp.enums.FriendRequestStatus;
import com.vtd.chatwebapp.enums.SocketEvent;
import com.vtd.chatwebapp.exception.ErrorCode;
import com.vtd.chatwebapp.exception.NotFoundException;
import com.vtd.chatwebapp.repository.FriendRepository;
import com.vtd.chatwebapp.repository.UserRepository;
import com.vtd.chatwebapp.service.FriendService;
import com.vtd.chatwebapp.socket.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {
  private final FriendRepository friendRepository;
  private final UserRepository userRepository;
  private final NotificationService notificationService;

  @Override
  public boolean friendRequest(FriendDto friendDto) {
    try {
      User sender = userRepository.findById(friendDto.getSenderId()).orElseThrow(() ->
              new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));
      User receiver = userRepository.findById(friendDto.getReceiverId()).orElseThrow(() ->
              new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));

      Friend friend = Friend.builder()
              .sender(sender)
              .receiver(receiver)
              .status(FriendRequestStatus.PENDING)
              .build();
      friendRepository.save(friend);
      notificationService.sendNotificationHandleFriend(
              SocketEvent.NOTIFICATION_FRIEND_REQUEST.getEvent(),
              receiver.getUserId(),
              String.format(MessageConstant.CHAR_SEQUENCE_2, sender.getRealName(), MessageConstant.SENT_FRIEND_REQUEST));
      return true;
    } catch (NotFoundException ex) {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND, ex.getCause());
    }
  }

  @Override
  public List<FriendResponse> getAllFriend(Long userId) {
    List<Friend> friends = friendRepository.findAllFriend(userId);
    List<FriendResponse> friendResponses = new ArrayList<>();

    for (Friend friend : friends) {
      User friendUser = userId.equals(friend.getReceiver().getUserId()) ? friend.getSender() : friend.getReceiver();

      FriendResponse friendResponse = FriendResponse.builder()
              .friendId(friend.getFriendId())
              .friend(friendUser)
              .build();
      friendResponses.add(friendResponse);
    }
    return friendResponses;
  }

  @Override
  public List<FriendResponse> getAllFriendRequest(Long userId, ConnectionStatus status) {
    List<Friend> friends;
    return switch (status) {
      case SENT -> {
        friends = friendRepository.findAllFriendRequestSent(userId);
        yield friends.stream()
                .map(friend -> new FriendResponse(friend.getFriendId(), friend.getReceiver()))
                .collect(Collectors.toList());
      }
      case RECEIVED -> {
        friends = friendRepository.findAllFriendRequestReceived(userId);
        yield friends.stream()
                .map(friend -> new FriendResponse(friend.getFriendId(), friend.getSender()))
                .collect(Collectors.toList());
      }
      default -> Collections.emptyList();
    };
  }

  @Override
  public boolean confirmFriendRequest(int friendId) {
    try {
      friendRepository.findById(friendId).ifPresent(friend -> {
        friend.setStatus(FriendRequestStatus.ACCEPTED);
        friendRepository.save(friend);
        User sender = friend.getSender();
        notificationService.sendNotificationHandleFriend(
                SocketEvent.NOTIFICATION_ACCEPTED_FRIEND_REQUEST.getEvent(),
                sender.getUserId(),
                String.format(MessageConstant.CHAR_SEQUENCE_2, friend.getReceiver().getRealName(), MessageConstant.ACCEPTED_FRIEND_REQUEST));
      });
      return true;
    } catch (NotFoundException ex) {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND, ex.getCause());
    }
  }

  @Override
  @Transactional
  public boolean cancelOrDeleteFriendRequest(int friendId) {
    try {
      Friend friend = friendRepository.findById(friendId).orElseThrow(() ->
              new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND)
              );

      friendRepository.delete(friend);
      notificationService.sendNotificationHandleFriend(
              SocketEvent.NOTIFICATION_DELETE_FRIEND_REQUEST.getEvent(),
              friend.getSender().getUserId(), StringUtils.EMPTY);
      notificationService.sendNotificationHandleFriend(
              SocketEvent.NOTIFICATION_DELETE_FRIEND_REQUEST.getEvent(),
              friend.getReceiver().getUserId(), StringUtils.EMPTY);
      return true;
    } catch (NotFoundException ex) {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND, ex.getCause());
    }
  }

  @Override
  @Transactional
  public boolean deleteFriend(DeleteFriendDto deleteFriendDto) {
    try {
      friendRepository.findBySenderOrReceiver(deleteFriendDto.getUser1Id(), deleteFriendDto.getUser2Id()).ifPresent(friendRepository::delete);
      return true;
    } catch (NotFoundException ex) {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND, ex.getCause());
    }
  }

}
