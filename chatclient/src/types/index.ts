export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  realName: string;
  email: string;
  password: string;
};

export type MessgaeSend = {
  senderId: number;
  chatId: number;
  content: string;
};
