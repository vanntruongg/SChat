package com.vtd.chatwebapp.service.impl;

import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.entity.Friend;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.entity.dto.FriendDto;
import com.vtd.chatwebapp.entity.dto.FriendResponse;
import com.vtd.chatwebapp.enums.ConnectionStatus;
import com.vtd.chatwebapp.enums.FriendRequestStatus;
import com.vtd.chatwebapp.exception.ErrorCode;
import com.vtd.chatwebapp.exception.NotFoundException;
import com.vtd.chatwebapp.repository.FriendRepository;
import com.vtd.chatwebapp.repository.UserRepository;
import com.vtd.chatwebapp.service.FriendService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {
    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

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

            return true;
        } catch (NotFoundException ex) {
            throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND, ex.getCause());
        }
    }

    @Override
    public List<FriendResponse> getAllFriend(Long userId) {
        List<Friend> friends = friendRepository.findAllFriend(userId);
        List<FriendResponse> friendResponses = new ArrayList<>();

        for (Friend friend: friends) {
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
        List<Friend> friends = friendRepository.findAllFriendRequest(userId);
        return new ArrayList<>(friends.stream()
                .map(friend -> {
                    FriendResponse friendResponse = new FriendResponse();
                    friendResponse.setFriendId(friend.getFriendId());
                    friendResponse.setFriend(status.equals(ConnectionStatus.SENT) ? friend.getReceiver() : friend.getSender());
                    return friendResponse;
                })
                .toList());
    }

    @Override
    @Transactional
    public boolean cancelOrDeleteFriendRequest(int friendId) {
        try {
            friendRepository.findById(friendId).ifPresent(friendRepository::delete);
            return true;
        } catch (NotFoundException ex) {
            throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND, ex.getCause());
        }
    }
}
