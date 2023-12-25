import AvatarDefault from '../assets/avatar_default.png';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IUser, UserFriendStatus } from '../interfaces/index';
import userService from '../service/user.service';
import { UserMinusIcon } from '@heroicons/react/24/solid';
import friendService from '../service/friend.service';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { RiUserAddFill } from 'react-icons/ri';
import { ChatType, FriendStatus, TypeUser } from '../enums';
import ButtonAddFriend from '../components/button/ButtonAddFriend';
import ButtonFriendRequestReceived from '../components/button/ButtonFriendRequestReceived';
import ButtonFriendRequestSent from '../components/button/ButtonFriendRequestSent';
import ButtonUnFriend from '../components/button/ButtonUnFriend';
import chatService from '../service/chat.service';

const User = () => {
  const { user: userLogin } = useSelector((state: RootState) => state.auth);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { userId } = state;

  const [userFriendStatus, setUserFriendStatus] = useState<UserFriendStatus | null>(null);

  const [friends, setFriends] = useState<number>(0);
  const [groups, setGroups] = useState<number>(0);
  // const [isFriendRequest, setIsFriendRequest] = useState<boolean>(false);

  const fetchData = async () => {
    if (userLogin) {
      const res = await userService.getUserAndFriendStatus(userLogin?.userId, userId);
      if (res) {
        setUserFriendStatus(res);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [state]);

  if (!userFriendStatus) {
    return null;
  }
  const { user, friendStatus, friendId, sender } = userFriendStatus;
  // console.log(friendStatus);
  const handleSendMessage = async () => {
    if (userLogin) {
      const res = await chatService.createPrivateChat(userLogin?.userId, user.userId);
      if (res) {
        const receiver: IUser = userLogin.userId === res.sender.userId ? res.receiver : res.sender;
        navigate(`/messages/c/${res.privateChatId}`, {
          state: { chatId: res.privateChatId, receiver: receiver, type: ChatType.Private },
        });
      }
    }
  };

  return (
    <>
      {user && (
        <div className="px-10 h-full flex flex-col">
          <div className="flex gap-4 border-b py-10 border-slate-400">
            <div className="flex justify-center px-10 ">
              <img
                src={user.avatar ?? AvatarDefault}
                alt="avatar"
                className="w-28 h-28 rounded-full overflow-hidden"
              />
            </div>
            <div className="flex-1 flex-col justify-between h-full ">
              <div className="flex justify-between">
                <h3 className="text-24 font-semibold">{user.realName}</h3>
                <button
                  className="bg-quaternary bg-opacity-80 text-secondary p-2 font-semibold rounded-md transition-all duration-200 hover:bg-opacity-50"
                  onClick={handleSendMessage}
                >
                  <span>Message</span>
                </button>
              </div>
              <h5 className="italic">@{user.userName}</h5>
            </div>
            {friendStatus === FriendStatus.Accepted && (
              <ButtonUnFriend friendId={friendId} fetchData={fetchData} />
            )}
            {friendStatus === FriendStatus.Pending ? (
              sender ? (
                <ButtonFriendRequestReceived userId={user.userId} fetchData={fetchData} />
              ) : (
                <ButtonFriendRequestSent userId={user.userId} fetchData={fetchData} />
              )
            ) : (
              <></>
            )}
            {friendStatus === FriendStatus.NotFriend && (
              <ButtonAddFriend userId={user.userId} fetchData={fetchData} />
            )}
          </div>

          <div className="p-10 h-full flex flex-col justify-between">
            <ul className="flex justify-between font-medium">
              <li>
                <p>{friends} friends</p>
              </li>
              <li>
                <p>{groups} groups</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
