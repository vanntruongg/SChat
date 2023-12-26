import { IUser } from '~/interfaces';

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  realName: string;
  email: string;
  password: string;
};

export type TMessageSend = {
  senderId: number;
  receiverId: number;
  privateChatId?: number | null;
  groupId?: number;
  content: string;
};

export type FriendRequest = {
  senderId: number;
  receiverId: number;
};

export type PrivateChatResponse = {
  privateChatId: number;
  receiver: IUser;
  lastMessage: LastMessage;
};

export type LastMessage = {
  messageId: number;
  user: IUser;
  content: string;
  sentAt: string;
};
