package com.vtd.chatwebapp.socket;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.vtd.chatwebapp.entity.Message;
import com.vtd.chatwebapp.entity.dto.MessageResponse;
import com.vtd.chatwebapp.entity.dto.PrivateMessageDto;
import com.vtd.chatwebapp.enums.SocketEvent;
import com.vtd.chatwebapp.service.MessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class ChatServer {
    private final SocketIOServer server;

    private final MessageService messageService;
    private final UserSessionService userSessionService;
    private final NotificationService notificationService;

    public ChatServer(SocketIOServer server, MessageService messageService, UserSessionService userSessionService, NotificationService notificationService) {
        this.server = server;
        this.messageService = messageService;
        this.userSessionService = userSessionService;
        this.notificationService = notificationService;

        server.addConnectListener(onConnected());
        server.addDisconnectListener(onDisconnected());
        this.server.addEventListener(SocketEvent.SEND_PRIVATE_MESSAGE.getEvent(), PrivateMessageDto.class, onPrivateChatReceived());
    }

    private DataListener<PrivateMessageDto> onPrivateChatReceived() {
        return (client, data, ackSender) -> {
           log.debug("Client[{}] - Received chat message: {}", client.getSessionId().toString(), data);
            MessageResponse message = messageService.savePrivateMessage(data);
            String roomName = generatePrivateRoomNameFromClient(client);
            server.getRoomOperations(roomName).sendEvent(SocketEvent.READ_PRIVATE_MESSAGE.getEvent(), message);
            server.getRoomOperations(roomName).sendEvent(SocketEvent.NEW_MESSAGE.getEvent());
        };
    }

    private ConnectListener onConnected() {
        return client -> {
            String sessionId = client.getSessionId().toString();
            String userId = extractUserIdFromHandshakeData(client);
            userSessionService.putUserToSession(Long.parseLong(userId), sessionId);
            System.out.println("Client connected with userId: " + userId);
            String roomName = generatePrivateRoomNameFromClient(client);
            client.joinRoom(roomName);
            System.out.println("Client connected room: " + roomName);
        };
    }

    private DisconnectListener onDisconnected() {
        return client -> {
            String privateRoom = generatePrivateRoomNameFromClient(client);
            String userId = extractUserIdFromHandshakeData(client);
            userSessionService.removeUserSession(Long.parseLong(userId));
            System.out.println("Client disconnected room: " + privateRoom);
            System.out.println("Client disconnected with userId: " + userId);

        };
    }

    private String extractUserIdFromHandshakeData(SocketIOClient client) {
        return client.getHandshakeData().getSingleUrlParam("userId");
    }

    private String generatePrivateRoomNameFromClient(SocketIOClient client) {
        return client.getHandshakeData().getSingleUrlParam("roomName");
    }

}
