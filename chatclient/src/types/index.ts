export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  realName: string;
  email: string;
  password: string;
};

export type MessageSend = {
  senderId: number;
  privateChatId?: number;
  groupId?: number;
  content: string;
};

export type FriendRequest = {
  senderId: number;
  receiverId: number;
};
