package com.vtd.chatwebapp.socket;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class UserSessionService {
  private final ConcurrentMap<Long, String> userSessionMap = new ConcurrentHashMap<>();

  public void putUserToSession(Long userId, String sessionId) {
    userSessionMap.put(userId, sessionId);
  }

  public String getSessionIdByUserId(Long userId) {
    return userSessionMap.get(userId);
  }

  public void removeUserSession(Long userId) {
    userSessionMap.remove(userId);
  }
}
