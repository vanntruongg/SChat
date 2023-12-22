import AvatarDefault from '../assets/avatar_default.png';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IUser } from '../interfaces/index';
import userService from '../service/user.service';

const Account = () => {
  const { state } = useLocation();
  console.log(location.pathname.substring(1));
  const [user, setUser] = useState<IUser | null>();
  const [friends, setFriends] = useState<number>(0);
  const [groups, setGroups] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const res = await userService.getUserById(state);
      setUser(res);
    };
    fetchData();
  }, []);

  console.log(user);

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
            <div className="bg-gradient-to-r from-primary to-tertiary bg-clip-text">
              <h3 className="text-24 text-transparent font-semibold">
                {user?.realName}
              </h3>
            </div>
            <button className="bg-tertiary bg-opacity-80 text-secondary p-2 font-semibold rounded-md transition-all duration-200 hover:bg-opacity-100">
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
