package com.vtd.chatwebapp.controller;

import com.corundumstudio.socketio.SocketIOServer;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/socket")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SocketController {
    private final SocketIOServer socketIOServer;

    @PostMapping("/send-message")
    public String sendMessage(String message) {
        socketIOServer.getBroadcastOperations().sendEvent("message", message);
        return message;
    }
}
