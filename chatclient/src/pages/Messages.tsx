import { Bars4Icon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import MessageSend from '../components/MessageSend';
import MessageReceive from '../components/MessageReceive';
import { useLocation } from 'react-router-dom';
import { IMessage } from '~/interfaces';
import { FormEvent, useEffect, useState } from 'react';
import messageService from '../service/message.service';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { MessgaeSend } from '../types';
import { MessageActionsType } from '../enums';
import useSocket from '../hooks/useSocket';

const Messages = ({}) => {
  const { state } = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const { receiver, chatId } = state;
  const [message, setMessage] = useState<string | ''>('');
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const socket = useSocket({ userId: user.userId });
  // console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      const res = await messageService.getAllByChatId(chatId);
      setMessageList(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on(MessageActionsType.ReadMessage, (message) => {
        console.log('Received message: ', message);
        setMessageList((prevMessage) => [...prevMessage, message]);
      });
    }
  }, [socket]);
  // console.log(chats);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket && message.trim() != '') {
      const data: MessgaeSend = {
        senderId: user.userId,
        chatId: chatId,
        content: message,
      };
      console.log(data);
      socket.emit(MessageActionsType.SendMessage, data);
      setMessage('');
    }
  };

  return (
    <div className="bg-primary text-secondary h-full flex flex-col justify-between">
      {/* header */}
      <header className="bg-quaternary flex justify-between items-center px-4 py-2 backdrop-blur-2xl shadow-xl">
        <div className="flex items-center gap-4">
          <img src={receiver.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
          <div className="flex flex-col">
            <span className="text-">{receiver.realName}</span>
            {receiver.online && (
              <div className="flex items-center gap-1 text-14">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                <span>Online</span>
              </div>
            )}
          </div>
        </div>
        <div className="relative group">
          <Bars4Icon className="w-5 h-5" />
          <div className="absolute right-2.5 top-2.5 bg-secondary rounded-b-md rounded-tl-md origin-top-right scale-0 invisible group-hover:visible group-hover:scale-100 transition-all duration-300">
            <button className="w-full h-full text-red-600 whitespace-nowrap px-4 py-2 hover:bg-gray-200 hover:rounded-b-md hover:rounded-tl-md">
              Out group
            </button>
          </div>
        </div>
      </header>
      <div className="bg-tertiary flex flex-col justify-end text-secondary px-4 h-full scroll-smooth scrollbar-w-1 scrollbar scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-track-slate-700 scrollbar-thumb-primary overflow-y-auto">
        <ul className="my-10 gap-2">
          {messageList.length != 0 &&
            messageList.map((message) => (
              <li key={message.messageId} className="">
                {message.user.userId === user.userId ? (
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
      {/* form text message */}
      <div className="bg-quaternary shadow-md">
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
