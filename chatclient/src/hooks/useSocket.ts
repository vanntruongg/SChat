import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
interface UseSocketProps {
  userId: number | undefined;
  roomName?: string;
}

const useSocket = ({ userId, roomName }: UseSocketProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8088', {
      query: { userId: userId, roomName },
      autoConnect: false,
      reconnection: true,
    });
    setSocket(newSocket);
    // newSocket.on('connect', () => {
    //   console.log('Client connected with userId: ', userId);

    //   // const roomName = `private_room_${chatId}`;

    //   // Tham gia phòng
    //   // newSocket.emit('joinRoom', { roomName });
    //   // console.log('client join room: ', roomName);
    // });

    // return () => {
    //   console.log('Client disconnected with userId: ', userId);
    //   newSocket.disconnect();
    // };
  }, [userId]);

  return socket;
};

export default useSocket;
