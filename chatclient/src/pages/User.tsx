import AvatarDefault from '../assets/avatar_default.png';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IUser } from '../interfaces/index';
import userService from '../service/user.service';
import { UserMinusIcon } from '@heroicons/react/24/solid';
import friendService from '../service/friend.service';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const User = () => {
  const { user: userLogin } = useSelector((state: RootState) => state.auth);
  const { state } = useLocation();
  const [user, setUser] = useState<IUser>();
  const [friends, setFriends] = useState<number>(0);
  const [groups, setGroups] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await userService.getUserById(state);
      setUser(res);
    };
    fetchData();
  }, [state]);

  // console.log(user);
  const handleUnFriend = async (userId: any) => {
    await friendService.deleteFriend(userLogin.userId, userId);
  };

  return (
    <div className="px-10 h-full flex flex-col">
      <div className="flex gap-4 border-b py-10 border-slate-400">
        <div className="flex justify-center px-10 ">
          <img
            src={user?.avatar ?? AvatarDefault}
            alt="avatar"
            className="w-28 h-28 rounded-full overflow-hidden"
          />
        </div>
        <div className="flex-1 flex-col justify-between h-full ">
          <div className="flex justify-between">
            <div className="bg-gradient-to-r from-primary to-tertiary bg-clip-text">
              <h3 className="text-24 text-transparent font-semibold">{user?.realName}</h3>
            </div>
            <button className="bg-tertiary bg-opacity-80 text-secondary p-2 font-semibold rounded-md transition-all duration-200 hover:bg-opacity-100">
              <span>Edit profile</span>
            </button>
          </div>
          <h5 className="italic">@{user?.userName}</h5>
        </div>
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
        <div className="inline-flex justify-end">
          <button
            className="flex items-center gap-2 p-2 bg-tertiary text-secondary font-medium rounded-sm shadow-sm hover:bg-red-200 hover:text-red-600 transition-all duration-200"
            onClick={() => handleUnFriend(user?.userId)}
          >
            <UserMinusIcon className="w-6 h-6" />
            <p className="text-14 whitespace-nowrap">
              Unfriend <span className="font-bold">{user?.realName}</span>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
