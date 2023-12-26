import { FriendStatus } from '../enums';

export interface IUser {
  userId: number;
  avatar: string;
  userName: string;
  realName: string;
  email: string;
  online: boolean;
}

export interface IGroup {
  groupId: number;
  groupName: string;
  member: IUser[];
}

export interface IFriend {
  friendId: number;
  friend: IUser;
}

export const isIFriend = (user: IFriend | IUser): user is IFriend => {
  return (user as IFriend).friendId !== undefined;
};

export interface Chat {
  chatId: number;
}

export interface UserFriendStatus {
  user: IUser;
  friendStatus: FriendStatus;
  friendId: number;
  sender: boolean;
}

export interface IMessageResponse {
  messageId: number;
  user: IUser;
  chatId: number;
  content: string;
  sentAt: string;
}

export interface PrivateChat {
  privateChatId: number;
  sender: IUser;
  receiver: IUser;
}
