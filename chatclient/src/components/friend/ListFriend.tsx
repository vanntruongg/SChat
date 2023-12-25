import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import userService from '../../service/user.service';
import { IFriend } from '../../interfaces/index';
import useSocket from '../../hooks/useSocket';
import { NotificationEvent, SidebarType, TypeUser } from '../../enums';
import ListUser from './ListUser';

const ListFriend = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [friends, setFriends] = useState<IFriend[]>([]);
  const socket = useSocket({ userId: user?.userId ?? 0 });
  // const { state } = useLocation();
  // const { receiver, chatId } = state;
  const fetchData = async () => {
    const res: IFriend[] | undefined = await userService.getAllFriends(user?.userId);
    setFriends(res);
  };
  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (socket) {
  //     socket.connect();
  //     socket.on(NotificationEvent.AcceptedFriendRequest, () => {
  //       fetchData();
  //     });
  //   }
  //   return () => {
  //     if (socket && socket.connected) {
  //       socket.disconnect();
  //     }
  //   };
  // });
  return (
    <ListUser
      title={SidebarType.AllFriend}
      users={friends}
      type={TypeUser.Friend}
      fetchData={fetchData}
    />
  );
};

export default ListFriend;
