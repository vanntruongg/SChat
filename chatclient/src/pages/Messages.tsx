import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import MessageSend from '../components/message/MessageSend';
import MessageReceive from '../components/message/MessageReceive';
import { useLocation } from 'react-router-dom';
import { IMessageResponse, IUser } from '~/interfaces';
import { FormEvent, useEffect, useRef, useState } from 'react';
import messageService from '../service/message.service';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { TMessageSend } from '../types';
import { SocketEvents } from '../enums';
import chatService from '../service/chat.service';
import HeaderChat from '../components/HeaderChat';
import { Socket, io } from 'socket.io-client';
import { generateRoomName } from '../helper/chat';

const Messages = ({}) => {
  const { state } = useLocation();
  const { user: userLogin } = useSelector((state: RootState) => state.auth);
  const { receiver, type } = state;
  const [message, setMessage] = useState<string | ''>('');
  const [messageList, setMessageList] = useState<IMessageResponse[]>([]);
  const [chatId, setChatId] = useState<number | null>(null);

  const [socket, setSocket] = useState<Socket | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const fetchChatId = async () => {
      if (userLogin && receiver) {
        const res = await chatService.getChatId(userLogin.userId, receiver.userId);
        if (res) {
          setChatId(res);
          const resAllChat = await messageService.getAllByChatId(res);
          setMessageList(resAllChat);
        }
      }
    };
    fetchChatId();
  }, [receiver]);

  useEffect(() => {
    let roomName;
    if (userLogin) {
      roomName = generateRoomName(userLogin.userId, receiver.userId);
    }
    const newSocket = io('http://localhost:8088', {
      query: { userId: userLogin?.userId, roomName },
      autoConnect: false,
      reconnection: true,
    });
    setSocket(newSocket);

    if (newSocket) {
      newSocket.connect();
      console.log('Joined Room: ', roomName);

      newSocket.emit('joinRoom', { roomName });

      newSocket.on(SocketEvents.READ_PRIVATE_MESSAGE, (message: IMessageResponse) => {
        console.log('Received message: ', message);
        setMessageList((prevMessage) => [...prevMessage, message]);
      });
    }

    return () => {
      newSocket?.disconnect();
    };
  }, [receiver]);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (socket && message.trim() != '' && userLogin) {
      const data: TMessageSend = {
        senderId: userLogin.userId,
        receiverId: receiver.userId,
        privateChatId: chatId,
        content: message.trim(),
      };

      socket.emit(SocketEvents.SEND_PRIVATE_MESSAGE, data);
      setMessage('');
    }
  };

  const scrollToEnd = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToEnd();
  }, [messageList]);

  return (
    <div className="h-full flex flex-col justify-between">
      {/* header */}
      <HeaderChat user={receiver} />

      <div
        ref={listRef}
        className="h-full overflow-auto scroll-smooth scrollbar-w-1 scrollbar scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-track-slate-700 scrollbar-thumb-primary"
      >
        <div className="px-2">
          <ul className="gap-2">
            {messageList &&
              messageList.length > 0 &&
              messageList.map((message) => (
                <li key={message.messageId} className="">
                  {message.user.userId === userLogin?.userId ? (
                    <div className="flex justify-end my-0.5">
                      <MessageSend message={message.content} time={message.sentAt} />
                    </div>
                  ) : (
                    <div className="flex my-0.5">
                      <MessageReceive message={message.content} time={message.sentAt} />
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* form text message */}
      <div className="shadow-md">
        <form className="" onSubmit={sendMessage}>
          <div className="flex gap-2 m-4">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-1.5 px-4 bg-tertiary border rounded-full placeholder:text-14"
              required
            />
            <button className="px-4 border bg-primary text-white font-semibold rounded-t-md rounded-bl-md hover:bg-opacity-90 transition-all duration-200 text-14">
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Messages;
