export interface IUser {
  userId: number;
  avatar: string;
  userName: string;
  realName: string;
  email: string;
  online: boolean;
}

export interface IFriend {
  friendId: number;
  friend: IUser;
}

export interface Chat {
  chatId: number;
}

export interface UserChat {
  chat: Chat;
  user: IUser;
  userChatId: number;
}

export interface IMessage {
  messageId: number;
  user: IUser;
  content: string;
  sentAt: string;
}
