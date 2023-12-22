export enum MessageActionsType {
  SendMessage = 'send_message',
  ReadMessage = 'read_message',
}

export enum NotificationEvent {
  FriendRequest = 'notification_friend_request',
  AcceptedFriendRequest = 'notification_accepted_friend_request',
  UnSentFriendRequest = 'notification_unsent_friend_request',
  DeletedFriendRequest = 'notification_delete_friend_request',
}
