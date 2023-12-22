import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
interface UseSocketProps {
  userId: number;
}

const useSocket = ({ userId }: UseSocketProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log('Socket userId: ', userId);

    const newSocket = io('http://localhost:8088', {
      query: { userId: userId },
    });
    setSocket(newSocket);
    newSocket.on('connect', () => {
      console.log('Client connected');

      // const roomName = `private_room_${chatId}`;

      // Tham gia phòng
      // newSocket.emit('joinRoom', { roomName });
      // console.log('client join room: ', roomName);
    });

    return () => {
      console.log('Client disconnected');
      newSocket.disconnect();
    };
  }, [userId]);

  return socket;
};

export default useSocket;
