package com.vtd.chatwebapp.entity.dto;

import com.vtd.chatwebapp.entity.Message;
import com.vtd.chatwebapp.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PrivateChatResponse {
  private int privateChatId;
  private User receiver;
  private Message lastMessage;
}
