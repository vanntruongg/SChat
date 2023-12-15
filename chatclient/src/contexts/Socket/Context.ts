import { Socket } from 'socket.io-client';

export interface ISocketContextState {
  socket: Socket | undefined;
  uid: string;
  users: string[];
}

export const defaultSocketContextState: ISocketContextState = {
  socket: undefined,
  uid: '',
  users: [],
};

export type TSocketContextActions =
  | 'update_socket'
  | 'update_uid'
  | 'update_users'
  | 'remove_user';

export type TSocketContextPayload = string | string[] | Socket;

export interface ISocketContextActions {
  type: TSocketContextActions;
  payload: TSocketContextPayload;
}

export const S;
