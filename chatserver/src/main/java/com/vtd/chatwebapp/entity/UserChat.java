package com.vtd.chatwebapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "user_chat", schema = "public")
public class UserChat extends BaseEntity {
    @Id
    @Column(name = "user_chat_id")
    private int userChatId;
    @ManyToOne
    @JoinColumn(name = "sender_id", referencedColumnName = "user_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id", referencedColumnName = "user_id")
    private User receiver;

    @ManyToOne
    @JoinColumn(name = "chat_id", referencedColumnName = "chat_id")
    private Chat chat;

    @Column(name = "user_deleted", length = 10)
    private String userDeleted;
}