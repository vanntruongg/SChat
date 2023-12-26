export enum SocketEvents {
  SEND_PRIVATE_MESSAGE = 'send_private_message',
  READ_PRIVATE_MESSAGE = 'read_private_message',
  SEND_GROUP_MESSAGE = 'send_group_message',
  READ_GROUP_MESSAGE = 'read_group_message',
  NEW_MESSAGE = 'new_message',
  NEW_FRIEND = 'new_friend',
  NOTIFICATION = 'notification',
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
