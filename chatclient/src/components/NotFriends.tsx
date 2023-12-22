import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import userService from '../service/user.service';
import { RootState } from '../redux/store';
import { IFriend, IUser } from '../interfaces';
import CardFriend from './CardFriend';
import CardFriendRequestReceived from './CardFriendRequestReceived';
import CardFriendRequestSent from './CardFriendRequestSent';
import useSocket from '../hooks/useSocket';
import { NotificationEvent } from '../enums';

const NotFriends = () => {
  const { user: userLogin } = useSelector((state: RootState) => state.auth);

  const [allUser, setAllUser] = useState<IUser[]>([]);
  const [friendRequestSent, setriendRequestSent] = useState<IFriend[]>([]);
  const [friendRequestReceived, setriendRequestReceived] = useState<IFriend[]>([]);

  const socket = useSocket({ userId: userLogin.userId });

  const fetchData = async () => {
    try {
      const [resFriendRequestSent, resFriendRequestReceived, resAllUser] = await Promise.all([
        userService.getAllFriendRequestSent(userLogin.userId),
        userService.getAllFriendRequestRecevied(userLogin.userId),
        userService.getAllUserNotFriends(userLogin.userId),
      ]);
      setriendRequestSent(resFriendRequestSent);
      setriendRequestReceived(resFriendRequestReceived);
      setAllUser(resAllUser);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on(NotificationEvent.FriendRequest, () => {
        console.log('refresh-data 1');
        fetchData();
      });
      socket.on(NotificationEvent.AcceptedFriendRequest, () => {
        console.log('refresh-data 2');

        fetchData();
      });
      socket.on(NotificationEvent.UnSentFriendRequest, () => {
        console.log('refresh-data 3');

        fetchData();
      });
      socket.on(NotificationEvent.DeletedFriendRequest, () => {
        console.log('refresh-data 4');
        fetchData();
      });
    }
  }, [socket]);

  return (
    <div className="p-5 bg-secondary gap-4 h-full flex flex-col">
      <ToastContainer />
      <div className="overflow-y-scroll scrollbar scrollbar-w-1 scrollbar-track-slate-300 scrollbar-track-rounded-md scrollbar-thumb-primary scrollbar-thumb-rounded-md">
        {/* Friend sent requests */}
        {(friendRequestSent.length > 0 || friendRequestReceived?.length > 0) && (
          <h2 className="text-24 font-bold">Friend requests</h2>
        )}
        {friendRequestSent.length > 0 && (
          <div className="border-b p-5">
            <div className="flex justify-between">
              <h3 className="text-18">Sent requests</h3>
              <Link
                to={'/friends/request'}
                className="p-1 rounded-sm text-primary hover:bg-tertiary hover:text-secondary transition-all duration-150"
              >
                <span className="text-14">See all</span>
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {friendRequestSent?.map((user: IFriend) => (
                <CardFriendRequestSent
                  key={user.friendId}
                  friendId={user.friendId}
                  user={user.friend}
                  fetchData={fetchData}
                />
              ))}
            </div>
          </div>
        )}
        {/* Friend requests received */}
        {friendRequestReceived?.length > 0 && (
          <div className="border-b p-5 mb-5">
            <div className="flex justify-between">
              <h3 className="text-18">Recevied requests</h3>
              <Link
                to={'/friends/request'}
                className="p-1 rounded-sm text-primary hover:bg-tertiary hover:text-secondary transition-all duration-150"
              >
                <span className="text-14">See all</span>
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {friendRequestReceived?.map((user: IFriend) => (
                <CardFriendRequestReceived
                  key={user.friendId}
                  friendId={user.friendId}
                  user={user.friend}
                  fetchData={fetchData}
                />
              ))}
            </div>
          </div>
        )}
        {/* all user */}
        {allUser.length > 0 && (
          <>
            <h2 className="text-24 font-bold">All user</h2>
            <div className="p-5">
              <div className="flex justify-between">
                <h3 className="text-18">People you may know</h3>
                <Link
                  to={'/friends/suggestions'}
                  className="p-1 rounded-sm text-primary hover:bg-tertiary hover:text-secondary transition-all duration-150"
                >
                  <span className="text-14">See all</span>
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {allUser?.map((user: IUser) => (
                  <CardFriend key={user.userId} friend={user} fetchData={fetchData} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotFriends;
