package com.vtd.chatwebapp.entity.dto;

import com.vtd.chatwebapp.entity.Message;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatResponse<T> {
  private T chat;
  private Message lastMessage;

}
