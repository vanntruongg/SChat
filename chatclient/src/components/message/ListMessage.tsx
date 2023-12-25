import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AvatarDefault from '../assets/avatar_default.png';
import { Link, useLocation } from 'react-router-dom';
import messageService from '../../service/message.service';
import { IMessage } from '~/interfaces';
import Message from './Message';

const messages = [
  {
    id: 1,
    avatar:
      'https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-1/279711787_1197861434285915_1965432830939050892_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeEU6wbFbfjkZCK2S76i52ZIqe_6kYH4I2up7_qRgfgja4OKYk6yfJJQ24P6VXt4VqrbxIjDkNm9U9_sVWtF2pBB&_nc_ohc=NFEVyPP-1uwAX9NyaRd&_nc_oc=AQlxL_O3LBR-758CCDUm6SkhfPkCW_OW1J9Rkv-uVjK1VNDkH9KtiGPAIXeHQJD8JVI&_nc_ht=scontent.fvca1-4.fna&oh=00_AfDGMS-td22aBUS3gBw1WZ7LoN7U6bXjmwmj0sRTbtIVug&oe=658E5BDA',
    userName: 'Thao Nguyen',
    lastMessage: 'Anh nghĩ gì về em :))',
  },
  {
    id: 2,
    avatar:
      'https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-1/378352523_1654617145032053_813550497900475284_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeHD9kLIYUyb7Giu2epM1TUZxWZVskbBIN7FZlWyRsEg3g9r20daX6g0X3HiSyKHp6L6oQsi_VBJsoYkzh4v3kaz&_nc_ohc=mGLCUssVn5UAX-6yQIW&_nc_ht=scontent.fvca1-4.fna&oh=00_AfBPdKdY8s4Lk1LY_lUNNbsrqT6ArJIAU3Uep_663V847A&oe=658E4A81',
    userName: 'Nguyễn Phương Thư',
    lastMessage: 'Hello, lau oi hong gap.',
  },
];

const ListMessage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [chats, setChats] = useState<[]>([]);
  const { state } = useLocation();
  // console.log(state);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const res = await messageService.getAllByChatId(user.userId);
        setChats(res);
      }
    };
    fetchData();
  }, []);

  console.log(chats);

  return (
    <div className="pl-1 pr-2">
      <h3 className="font-bold text-20 px-2">Chats</h3>

      <div className="overflow-y-auto scrollbar scrollbar-w-1 scrollbar-track-slate-300 scrollbar-track-rounded-md scrollbar-thumb-primary scrollbar-thumb-rounded-md">
        {messages.map(({ id, avatar, userName, lastMessage }) => (
          <Message key={id} avatar={avatar} userName={userName} lastMessage={lastMessage} />
        ))}
        {/* {chats.map(({ chat, user }) => (
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
          ))} */}
      </div>
    </div>
  );
};

export default ListMessage;
