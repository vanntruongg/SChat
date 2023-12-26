import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '~/interfaces';
import { LastMessage } from '~/types';
import { formatLongToTime } from '../../utils/dateTimeUtils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ChatType, SocketEvents } from '../../enums';
import useSocket from '../../hooks/useSocket';
import AvatarDefault from '../../assets/avatar_default.png';

interface MessageProps {
  privateChatId: number;
  receiver: IUser;
  lastMessage: LastMessage;
  fetchData: () => void;
}
const Message: React.FC<MessageProps> = ({ privateChatId, receiver, lastMessage, fetchData }) => {
  const { user: userLogin } = useSelector((state: RootState) => state.auth);
  const [roomName, setRoomName] = useState<string>('');
  const socket = useSocket({ userId: userLogin?.userId, roomName: roomName });

  useEffect(() => {
    socket?.on(SocketEvents.NEW_MESSAGE, () => {
      fetchData();
    });
  }, [socket]);
  console.log(receiver.avatar);

  return (
    <Link
      to={`/messages/c/${privateChatId}`}
      state={{
        chatId: privateChatId,
        receiver: receiver,
        type: ChatType.Private,
      }}
      className="p-2 w-full flex items-center gap-2 rounded-md hover:bg-gray-500 hover:bg-opacity-30"
    >
      <div className="rounded-full overflow-hidden size-14 ">
        <img
          src={receiver.avatar !== null ? receiver.avatar : AvatarDefault}
          alt="avatar"
          className=""
        />
      </div>
      <div className="flex-1">
        <span className="font-bold">{receiver.realName}</span>
        <div className={`flex gap-1 text-12 whitespace-nowrap `}>
          <h5 className="">
            {lastMessage?.user.userId === userLogin?.userId
              ? 'You'
              : receiver?.realName.split(' ').pop()}
            :
          </h5>
          <div className="flex w-full justify-between items-center">
            <p className="w-48 truncate">{lastMessage?.content}</p>
            <p className="text-10">{formatLongToTime(lastMessage?.sentAt)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Message;
