package com.vtd.chatwebapp.socket;

import com.corundumstudio.socketio.SocketIOServer;
import com.vtd.chatwebapp.constant.MessageConstant;
import com.vtd.chatwebapp.entity.Message;
import com.vtd.chatwebapp.enums.SocketEvent;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class NotificationService {
  private final SocketIOServer server;
  private final UserSessionService userSessionService;

  public void sendNotificationHandleFriend(String eventName, Long userId, String message) {
    String sessionId = userSessionService.getSessionIdByUserId(userId);
    if (sessionId != null) {
      System.out.println("sessionId" + sessionId);
      System.out.println("send event: " + eventName);
      System.out.println("send event to user: " + userId);
      server.getClient(UUID.fromString(sessionId)).sendEvent(eventName, message);
    }
  }

  public void sendNotificationNewMessage(Message message, Long receiver) {
    this.sendNotificationHandleFriend(
            SocketEvent.NEW_MESSAGE.getEvent(),
            receiver,
            String.format(
                    MessageConstant.CHAR_SEQUENCE_2,
                    message.getUser().getRealName(),
                    MessageConstant.SENT_NEW_MESSAGE
            )
    );
  }
}
