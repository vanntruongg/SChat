package com.vtd.chatwebapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "private_chat")
public class PrivateChat {

  @Id
  @Column(name = "private_chat_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int privateChatId;

  @ManyToOne
  @JoinColumn(name = "sender_id")
  private User sender;

  @ManyToOne
  @JoinColumn(name = "receiver_id")
  private User receiver;
}
