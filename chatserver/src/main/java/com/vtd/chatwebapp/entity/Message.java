package com.vtd.chatwebapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "message", schema = "public")
public class Message extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id", nullable = false, updatable = false)
    private int messageId;

    @ManyToOne
    @JoinColumn(name = "sender_id", referencedColumnName = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "chat_id", referencedColumnName = "chat_id")
    @JsonIgnore
    private Chat chat;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "sent_at")
    private Timestamp sentAt;

}
