package com.vtd.chatwebapp.service.impl;

import com.vtd.chatwebapp.common.StringUtils;
import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.entity.Friend;
import com.vtd.chatwebapp.entity.User;
import com.vtd.chatwebapp.entity.dto.FriendDto;
import com.vtd.chatwebapp.entity.dto.FriendResponse;
import com.vtd.chatwebapp.entity.dto.RegisterRequest;
import com.vtd.chatwebapp.entity.dto.UserDto;
import com.vtd.chatwebapp.enums.FriendStatus;
import com.vtd.chatwebapp.exception.DuplicateException;
import com.vtd.chatwebapp.exception.ErrorCode;
import com.vtd.chatwebapp.exception.NotFoundException;
import com.vtd.chatwebapp.repository.FriendRepository;
import com.vtd.chatwebapp.repository.UserRepository;
import com.vtd.chatwebapp.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final FriendRepository friendRepository;

  @Override
  public boolean createUser(RegisterRequest registerRequest) {
    try {
      Optional<User> userExisted = userRepository.findByEmail(registerRequest.getEmail());
      if (userExisted.isPresent()) {
        throw new DuplicateException(ErrorCode.NOT_NULL, MessageConstant.EMAIL_EXISTS);
      }
      User user = new User();
      user.setUserName(StringUtils.generateUserName(registerRequest.getRealName()));
      user.setRealName(registerRequest.getRealName());
      user.setEmail(registerRequest.getEmail());
      user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
      userRepository.save(user);

      return true;
    } catch (DuplicateException ex) {
      throw new DuplicateException(ErrorCode.NOT_NULL, MessageConstant.EMAIL_EXISTS, ex.getCause());
    }
  }

  @Override
  public User getUserByEmail(String email) {
    return userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));
  }


  @Override
  public List<User> getAll() {
    return userRepository.findAll();
  }

  @Override
  public List<User> getAllUserNotFriend(Long userId) {
    return userRepository.findNotFriends(userId);
  }

  @Override
  public User getUserById(Long userId) {
    return userRepository.findById(userId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));

  }

  @Override
  @Transactional
  public void setStatusUser(String email, boolean isOnline) {
    try {
      User user = userRepository.findByEmail(email).orElseThrow(() ->
              new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND)
      );
      user.setOnline(isOnline);
      userRepository.save(user);
    } catch (NotFoundException ex) {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND, ex.getCause());
    }
  }

  @Override
  public List<User> getAllUserByIds(List<Long> ids) {
    return userRepository.findAllById(ids);
  }

  @Override
  public UserDto getUserAndFriendStatusById(Long senderId, Long receiverId) {
    UserDto userDto = new UserDto();
    Optional<Friend> friend = friendRepository.findBySenderOrReceiver(senderId, receiverId);

    userDto.setFriendStatus(FriendStatus.NOT_FRIEND);

    friend.ifPresentOrElse(
            f -> {
              User userIsFriend = receiverId.equals(f.getSender().getUserId()) ? f.getSender() : f.getReceiver();
              userDto.setUser(userIsFriend);
              userDto.setSender(receiverId.equals(f.getSender().getUserId()));
              userDto.setFriendStatus(f.getStatus());
              userDto.setFriendId(f.getFriendId());
            },
            () -> {
              User user = userRepository.findById(receiverId)
                      .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));
              userDto.setUser(user);
            }
    );
    return userDto;
  }
}
