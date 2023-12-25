import AvatarDefault from '../assets/avatar_default.png';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Account = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  // const [user, setUser] = useState<IUser | null>();
  const [friends, setFriends] = useState<number>(0);
  const [groups, setGroups] = useState<number>(0);

  return (
    <div className="px-10">
      <div className="flex gap-4 border-b py-10 border-slate-400">
        <div className="flex justify-center px-10 ">
          <img
            src={user?.avatar ?? AvatarDefault}
            alt="avatar"
            className="w-28 h-28 rounded-full overflow-hidden"
          />
        </div>
        <div className="flex-1 flex-col justify-between h-full">
          <div className="flex justify-between">
            <h3 className="text-24 font-semibold">{user?.realName}</h3>
            <button className="bg-quaternary bg-opacity-80 text-secondary p-2 font-semibold rounded-md transition-all duration-200 hover:bg-opacity-100">
              <span>Edit profile</span>
            </button>
          </div>
          <h5 className="italic">@{user?.userName}</h5>
        </div>
      </div>
      <div className="p-5">
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
  );
};

export default Account;
