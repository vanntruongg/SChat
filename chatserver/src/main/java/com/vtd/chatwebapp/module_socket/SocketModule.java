package com.vtd.chatwebapp.module_socket;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SocketModule {

    private final SocketIOServer server;

    public SocketModule(SocketIOServer server) {
        this.server = server;
        server.addConnectListener(onConnected());
        server.addDisconnectListener(onDisconnected());
        this.server.addEventListener("send_message", String.class, onMessageReceived());
    }

    public ConnectListener onConnected() {
        return socketIOClient -> {
            System.out.println("Client connected: " + socketIOClient.getSessionId());
        };
    }

    public DisconnectListener onDisconnected() {
        return socketIOClient -> {
            System.out.println("Client disconnected: " + socketIOClient.getSessionId());
        };
    }

    public DataListener<String> onMessageReceived() {
        return (client, message, ackRequest) -> {
            System.out.println(message);
          for(SocketIOClient client1 : client.getNamespace().getAllClients()) {
              client1.sendEvent("read_message", message);
          }
        };
    }
}
