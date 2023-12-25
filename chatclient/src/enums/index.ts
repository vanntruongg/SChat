export enum MessageActionsType {
  SendMessage = 'send_message',
  ReadMessage = 'read_message',
}

export enum NotificationEvent {
  Notification = 'notification',
  NewMessage = 'new_message',
  NewFriend = 'new_friend',
}

export enum TypeUser {
  Friend = 'friend',
  FriendRequestSent = 'friend_request_sent',
  FriendRequestReceived = 'friend_request_received',
  User = 'user',
}

export enum SidebarType {
  AllFriend = 'All Friends',
  FriendRequests = 'Friend Requests',
  Suggestions = 'Suggestions',
}

export enum FriendStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  NotFriend = 'NOT_FRIEND',
}

export enum ChatType {
  Private = 'private',
  Group = 'group',
}
