import React, { useEffect, useState, useRef } from 'react';
import { Socket, io } from 'socket.io-client';
import useSocket from './hooks/useSocket';

const Demo = () => {
  const [messageList, setMessageList] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [socket, setSocket] = useState<Socket>();
  // const [isConnected, setConnected] = useState<Boolean>(false);
  useEffect(() => {
    const socket = io('http://localhost:8088');
    setSocket(socket);
    // socket.on('connect', () => setConnected(true));
    socket.on('read_message', (message: string) => {
      // console.log('Received: ', message);
      setMessageList((prevMessage) => [...prevMessage, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChangeInputMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    if (socket && message.trim() !== '') {
      socket.emit('send_message', message);
      setMessage('');
    }
    e.preventDefault();
  };

  return (
    <div className="bg-white w-1/2 mx-auto mt-8 min-h-[500px] flex flex-col justify-between rounded-md">
      <div className="mx-4">
        <h3 className="text-32 text-center font-medium">Chat App</h3>
        <ul className="text-14">
          {messageList.map((message, index) => (
            <li key={index} className="my-1">
              <span>{message}</span>
            </li>
          ))}
        </ul>
      </div>
      <form className="" onSubmit={(e) => sendMessage(e)}>
        <div className="flex gap-2 m-4">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleChangeInputMessage}
            className="w-full p-1 border rounded-sm placeholder:text-14"
            required
          />
          <button className="px-4 border bg-purple-600 text-white font-semibold rounded-tr-md rounded-bl-md hover:bg-purple-700 transition-all duration-200 text-14">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Demo;
