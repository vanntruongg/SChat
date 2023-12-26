import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Message from './Message';
import chatService from '../../service/chat.service';
import { PrivateChatResponse } from '~/types';

const ListMessage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [chats, setChats] = useState<PrivateChatResponse[] | []>([]);
  // console.log(state);
  const fetchData = async () => {
    if (user) {
      const res = await chatService.getAllPrivateChatByUserId(user.userId);
      setChats(res);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  console.log(chats);

  return (
    <div className="pl-1 pr-2 w-full">
      <h3 className="font-bold text-20 px-2">Chats</h3>

      <div className="w-full overflow-y-auto scrollbar scrollbar-w-1 scrollbar-track-slate-300 scrollbar-track-rounded-md scrollbar-thumb-primary scrollbar-thumb-rounded-md">
        {/* {messages.map(({ id, avatar, userName, lastMessage }) => (
          <Message key={id} avatar={avatar} userName={userName} lastMessage={lastMessage} />
        ))} */}
        {chats.length > 0 &&
          chats.map(({ privateChatId, receiver, lastMessage }) => (
            <Message
              key={privateChatId}
              privateChatId={privateChatId}
              receiver={receiver}
              lastMessage={lastMessage}
              fetchData={fetchData}
            />
          ))}
      </div>
    </div>
  );
};

export default ListMessage;
