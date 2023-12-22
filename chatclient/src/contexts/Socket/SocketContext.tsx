// import { ReactNode, createContext, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { Socket } from 'socket.io-client';
// import useSocket from '../../hooks/useSocket';
// import { NotificationEvent } from '../../enums';

// interface SocketContextProps {
//   userId: number;
//   children: ReactNode;
// }

// const SocketContext = createContext<Socket | null>(null);

// export const SocketProvider = ({ userId, children }: SocketContextProps) => {
//   const socket = useSocket({ userId });

//   useEffect(() => {
//     if (socket) {
//       socket.on(NotificationEvent.FriendRequest, (message: string) => {
//         toast(message);
//       });
//       socket.on(NotificationEvent.AcceptedFriendRequest, (message: string) => {
//         toast(message);
//       });
//     }
//   }, [socket]);

//   return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
// };

// export { SocketContext };
