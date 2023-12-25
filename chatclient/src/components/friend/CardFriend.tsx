import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { IFriend, IUser, isIFriend } from '../../interfaces';
import AvatarDefault from '../../assets/avatar_default.png';
import { TypeUser } from '../../enums';
import ButtonAddFriend from '../button/ButtonAddFriend';
import ButtonFriendRequestReceived from '../button/ButtonFriendRequestReceived';
import ButtonFriendRequestSent from '../button/ButtonFriendRequestSent';

interface CardFriendProps {
  friendOrUser: IFriend | IUser;
  type: TypeUser;
  fetchData: () => void;
}

const CardFriend = ({ friendOrUser, type, fetchData }: CardFriendProps) => {
  const [friendId, setFriendId] = useState<number | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (isIFriend(friendOrUser)) {
      const { friendId, friend } = friendOrUser;
      setFriendId(friendId);
      setUser(friend);
    } else {
      setUser(friendOrUser);
    }
  }, [friendOrUser]);

  return (
    <>
      {user && (
        <div key={user.userId} className="grid grid-cols-subgrid gap-2 bg-secondary rounded-lg">
          <Link
            to={`/${user.userName}`}
            state={{
              userId: user.userId,
            }}
            className="rounded-lg overflow-hidden"
          >
            <img
              src={user.avatar ?? AvatarDefault}
              alt="avatar"
              className="rounded-t-lg h-full w-full hover:scale-105  transition-all duration-200"
            />
          </Link>
          <div>
            <Link
              to={`/${user.userName}`}
              state={{
                userId: user.userId,
              }}
              className="px-2 text-quaternary font-semibold hover:underline hover:text-opacity-70"
            >
              <span>{user.realName}</span>
            </Link>
          </div>
          {type == TypeUser.Friend && (
            <Link
              to={`/${user?.userName}`}
              state={{
                userId: user.userId,
              }}
              className="w-ful m-2 px-4 py-2 bg-primary text-14 text-center text-secondary font-medium rounded-md hover:scale-[1.02] transition-all duration-100"
            >
              See more
            </Link>
          )}
          {friendId && type == TypeUser.FriendRequestSent && (
            <div className="m-2">
              <ButtonFriendRequestSent userId={friendId} fetchData={fetchData} />
            </div>
          )}
          {friendId && type == TypeUser.FriendRequestReceived && (
            <div className="m-2">
              <ButtonFriendRequestReceived userId={friendId} fetchData={fetchData} />
            </div>
          )}
          {type == TypeUser.User && (
            <div className="m-2">
              <ButtonAddFriend userId={user.userId} fetchData={fetchData} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CardFriend;
