import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import User from '../interfaces/user';
import { RootState } from '../redux/store';
import userService from '../service/user.service';
import AvatarDefault from '../assets/avatar_default.png';

const NotFriends = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [users, setUsers] = useState<User[] | undefined>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res: User[] | undefined = await userService.getAllUserNotFriends(
        user?.userId,
      );
      setUsers(res);
    };
    fetchData();
  }, []);

  return (
    <div className="p-5 bg-secondary gap-4 h-full flex flex-col">
      <div className="">
        <h3 className="font-bold text-20 mb-2">Users</h3>
        <form action="">
          <div className="bg-white flex items-center justify-between rounded-full shadow-md overflow-hidden">
            <input
              type="text"
              placeholder="Search @username"
              className="text-14 py-2 px-3 w-full"
            />
            <MagnifyingGlassIcon className="w-5 h-5 mr-3" />
          </div>
        </form>
      </div>
      <div className="grid grid-cols-4 gap-4 p-5 overflow-y-scroll scrollbar scrollbar-w-1 scrollbar-track-slate-300 scrollbar-track-rounded-md scrollbar-thumb-primary scrollbar-thumb-rounded-md">
        {users?.map(({ userId, avatar, userName, realName }: User) => (
          <div
            key={userId}
            className="flex flex-col bg-secondary border rounded-md"
          >
            <Link
              to={`/${userName}`}
              state={userId}
              className="rounded-md overflow-hidden"
            >
              <img
                src={avatar ?? AvatarDefault}
                alt="avatar"
                className="rounded-t-lg h-full hover:scale-105  transition-all duration-200"
              />
            </Link>
            <div className="p-3 flex flex-col gap-3">
              <div>
                <Link
                  to={`/${userName}`}
                  className="text-quaternary font-semibold hover:underline hover:text-opacity-70"
                >
                  <span>{realName}</span>
                </Link>
              </div>
              <button className="w-ful px-4 py-2 bg-primary text-14 text-secondary font-medium rounded-md hover:scale-[1.02] transition-all duration-100">
                Add friend
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotFriends;
