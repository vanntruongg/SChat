import React, { ReactNode, createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSocket from '../hooks/useSocket';
import { RootState } from '../redux/store';
import { Socket } from 'socket.io-client';
import { NotificationEvent } from '../enums';
import { ToastContainer, toast } from 'react-toastify';
import { receiveNotification } from '../redux/actions';

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketContext = createContext<Socket | null>(null);

const SocketProvider = ({ children }: SocketProviderProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const socket = useSocket({ userId: user?.userId });
  const dispatch = useDispatch();
  useEffect(() => {
    if (socket) {
      socket.connect();
      console.log('connect ');
      socket.on(NotificationEvent.NewFriend, (notification) => {
        console.log(notification);

        dispatch(receiveNotification(notification));
        toast(notification);
      });
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {/* <ToastContainer /> */}
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
