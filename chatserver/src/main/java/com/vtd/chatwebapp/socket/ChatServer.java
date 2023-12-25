package com.vtd.chatwebapp.socket;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.vtd.chatwebapp.entity.Message;
import com.vtd.chatwebapp.entity.dto.MessageDto;
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

    public ChatServer(SocketIOServer server, MessageService messageService, UserSessionService userSessionService) {
        this.server = server;
        this.messageService = messageService;
        this.userSessionService = userSessionService;

        server.addConnectListener(onConnected());
        server.addDisconnectListener(onDisconnected());
        this.server.addEventListener(SocketEvent.SEND_MESSAGE.getEvent(), MessageDto.class, onChatReceived());
    }

    private DataListener<MessageDto> onChatReceived() {
        return (client, data, ackSender) -> {
           log.debug("Client[{}] - Received chat message: {}", client.getSessionId().toString(), data);
            Message message = messageService.saveMessage(data);
            String roomName = generatePrivateRoomNameFromClient(client);
            server.getRoomOperations(roomName).sendEvent(SocketEvent.READ_MESSAGE.getEvent(), message);
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
        String chatId =  client.getHandshakeData().getSingleUrlParam("chatId");
        return "private_room_" + chatId;
    }

}
