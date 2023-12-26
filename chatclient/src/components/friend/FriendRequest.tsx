import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import userService from '../../service/user.service';
import { RootState } from '../../redux/store';
import { IFriend, IUser } from '../../interfaces';
import CardFriendRequestReceived from '../CardFriendRequestReceived';
import CardFriendRequestSent from '../CardFriendRequestSent';
import useSocket from '../../hooks/useSocket';
import { SocketEvents, SidebarType, TypeUser } from '../../enums';
import { receiveNotification } from '../../redux/actions';
import ListUser from './ListUser';
import { ToastContainer, toast } from 'react-toastify';

const FriendRequest = () => {
  const { user: userLogin } = useSelector((state: RootState) => state.auth);

  const [friendRequestSent, setriendRequestSent] = useState<IFriend[]>([]);
  const [friendRequestReceived, setriendRequestReceived] = useState<IFriend[]>([]);

  const socket = useSocket({ userId: userLogin?.userId ?? 0 });

  const fetchData = async () => {
    try {
      const [resFriendRequestSent, resFriendRequestReceived] = await Promise.all([
        userService.getAllFriendRequestSent(userLogin?.userId),
        userService.getAllFriendRequestRecevied(userLogin?.userId),
      ]);
      setriendRequestSent(resFriendRequestSent);
      setriendRequestReceived(resFriendRequestReceived);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    socket?.on(SocketEvents.NEW_MESSAGE, (notification) => {
      fetchData();
      toast(notification);
    });
  }, [socket]);
  return (
    <div className="">
      <ListUser
        title={'Requests sent'}
        users={friendRequestSent}
        type={TypeUser.FriendRequestSent}
        fetchData={fetchData}
      />
      <ListUser
        title={'Requests Received'}
        users={friendRequestReceived}
        type={TypeUser.FriendRequestReceived}
        fetchData={fetchData}
      />
    </div>
  );
};

export default FriendRequest;
