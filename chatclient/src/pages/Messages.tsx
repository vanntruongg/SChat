import { Bars4Icon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import MessageSend from '../components/message/MessageSend';
import MessageReceive from '../components/message/MessageReceive';
import { useLocation } from 'react-router-dom';
import { IMessage } from '~/interfaces';
import { FormEvent, useEffect, useState } from 'react';
import messageService from '../service/message.service';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { MessgaeSend } from '../types';
import { ChatType, MessageActionsType } from '../enums';
import useSocket from '../hooks/useSocket';

const Messages = ({}) => {
  const { state } = useLocation();
  const { user: userLogin } = useSelector((state: RootState) => state.auth);
  const { chatId, receiver, type } = state;
  const [groupId, setGroupId] = useState<number>(0);
  const [message, setMessage] = useState<string | ''>('');
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const socket = useSocket({ userId: userLogin?.userId, chatId: chatId });
  // console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      const res = await messageService.getAllByChatId(chatId);
      console.log(res);

      setMessageList(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (socket) {
      const roomName = `private_room_${chatId}`;
      socket.emit('joinRoom', { roomName });
      socket.on(MessageActionsType.ReadMessage, (message) => {
        console.log('Received message: ', message);
        setMessageList((prevMessage) => [...prevMessage, message]);
      });
    }
    console.log(messageList);
  }, [socket]);
  // console.log(chats);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (socket && message.trim() != '' && userLogin) {
      const data: MessgaeSend = {
        senderId: userLogin.userId.toString(),
        content: message.trim(),
      };

      if (type === ChatType.Private) {
        data.privateChatId = chatId;
      } else if (type === ChatType.Group) {
        data.groupId = chatId;
      }

      socket.emit(MessageActionsType.SendMessage, data);
      setMessage('');
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      {/* header */}
      <header className="flex justify-between items-center p-2 backdrop-blur-sm shadow-xl">
        <div className="flex items-center gap-4 h-full">
          <img src={receiver.avatar} alt="avatar" className="size-10 rounded-full" />
          <div className="flex flex-col gap-1">
            <span className="leading-none">{receiver.realName}</span>
            {receiver.online && (
              <div className="flex items-center gap-1 text-14 leading-none">
                <div className="size-2.5 bg-green-500 rounded-full"></div>
                <span className="text-12">Online</span>
              </div>
            )}
          </div>
        </div>

        <button className="relative group size-8 flex justify-center items-center rounded-full transition-all duration-200">
          <Bars4Icon className="size-4" />
          <div className="absolute right-6 bg-secondary rounded-full group-hover:visible invisible transition-all duration-200">
            <span className="w-full h-full text-tertiary text-14 whitespace-nowrap px-1 p-0.5 hover:bg-gray-200 rounded-full">
              Setting chat
            </span>
          </div>
        </button>
      </header>
      <div className="bg-tertiary flex flex-col justify-end text-secondary px-4 h-full scroll-smooth scrollbar-w-1 scrollbar scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-track-slate-700 scrollbar-thumb-primary overflow-y-auto">
        <ul className="my-10 gap-2">
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
