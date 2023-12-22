import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import userChatService from '../service/user-chat.service';
import AvatarDefault from '../assets/avatar_default.png';
import { Link, useLocation } from 'react-router-dom';
import { UserChat } from '~/interfaces';

const Message = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [chats, setChats] = useState<UserChat[]>([]);
  const { state } = useLocation();
  // console.log(state);

  useEffect(() => {
    const fetchData = async () => {
      const res = await userChatService.getAllChatByUserId(user?.userId);
      setChats(res);
    };
    fetchData();
  }, []);

  return (
    <div className="px-2 py-5 bg-secondary flex flex-col justify-between gap-4 h-full">
      <div className="">
        <h3 className="font-bold text-20 mb-2">Messages</h3>
        <form action="">
          <div className="bg-white flex items-center justify-between rounded-full shadow-md overflow-hidden">
            <input type="text" placeholder="Search message" className="text-14 py-2 px-3 w-full" />
            <MagnifyingGlassIcon className="w-5 h-5 mr-3" />
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-2 h-full overflow-y-auto scrollbar scrollbar-w-1 scrollbar-track-slate-300 scrollbar-track-rounded-md scrollbar-thumb-primary scrollbar-thumb-rounded-md">
        {chats.map(({ chat, user }) => (
          <Link
            to={`/messages/chat/${chat.chatId}`}
            state={{
              receiver: user,
              chatId: chat.chatId,
            }}
            key={chat.chatId}
            className={`flex gap-4  p-2 border border-gray-300 rounded-md shadow-sm  ${
              state?.receiver.userId == user.userId
                ? 'bg-primary text-secondary'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <img src={user.avatar ?? AvatarDefault} alt="" className="w-12 h-12 rounded-full" />
            <div className="overflow-hidden">
              <h3>{user.realName}</h3>
              <p className="text-14 whitespace-nowrap">Lorem ipsum dolor sit amet consectetur</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Message;
