package com.vtd.chatwebapp.chat_socket;

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

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Component
@Slf4j
public class ChatServer {
    private final SocketIOServer server;
    private final ConcurrentMap<Long, SocketIOClient> clientsByUserId;

    private final MessageService messageService;

    public ChatServer(SocketIOServer server, MessageService messageService) {
        this.server = server;
        this.messageService = messageService;
        this.clientsByUserId = new ConcurrentHashMap<>();

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
            printClientData(client);
            String roomName = generatePrivateRoomNameFromClient(client);
            client.joinRoom(roomName);
            System.out.println("Client connected room: " + roomName);
        };
    }

    private DisconnectListener onDisconnected() {
        return client -> {
            String privateRoom = generatePrivateRoomNameFromClient(client);
            System.out.println("Client disconnected room: " + privateRoom);
        };
    }


    private String generatePrivateRoomNameFromClient(SocketIOClient client) {
        String chatId =  client.getHandshakeData().getSingleUrlParam("chatId");
        return "private_room_" + chatId;
    }

    private Long getUserFromData(Long data) {
        return null;
    }

    private SocketIOClient getClientByUserId(Long userId) {
        return clientsByUserId.get(userId);
    }

    private void printClientData(SocketIOClient client) {
        System.out.println("Client data: " + client.get("userId"));
        // In các thông tin khác của client để kiểm tra dữ liệu
    }

}
