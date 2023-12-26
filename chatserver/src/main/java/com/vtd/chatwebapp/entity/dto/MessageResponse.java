package com.vtd.chatwebapp.entity.dto;

import com.vtd.chatwebapp.entity.User;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {
  private int messageId;
  private User user;
  private int chatId;

  private String content;
  private Timestamp sentAt;

}
