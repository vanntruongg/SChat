import React from 'react';
import { Link } from 'react-router-dom';

interface MessageProps {
  avatar: string;
  userName: string;
  lastMessage: string;
  groupId?: number;
}
const Message: React.FC<MessageProps> = ({ avatar, userName, lastMessage }) => {
  return (
    <Link
      to={'/messages/c/123'}
      className="p-2 w-full truncate flex items-center gap-2 rounded-md hover:bg-gray-500 hover:bg-opacity-30"
    >
      <div className="rounded-full overflow-hidden size-14 ">
        <img src={avatar} alt="avatar" className="" />
      </div>
      <div className="w-[276px] truncate">
        <span className="font-bold truncate">{userName}</span>
        <p className="text-14 truncate">{lastMessage}</p>
      </div>
    </Link>
  );
};

export default Message;
