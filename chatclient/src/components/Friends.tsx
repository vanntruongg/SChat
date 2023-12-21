import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import userService from '../service/user.service';
import IFriend from '~/interfaces/Friend';
import { Link } from 'react-router-dom';

const Friend = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [friends, setFriends] = useState<IFriend[] | undefined>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res: IFriend[] | undefined = await userService.getAllFriends(
        user?.userId,
      );
      setFriends(res);
    };
    fetchData();
  }, []);

  return (
    <div className="px-4 py-2 bg-secondary flex flex-col justify-between gap-4 h-full">
      <div className="">
        <h3 className="font-bold text-20 mb-2">Friends</h3>
        <form action="">
          <div className="bg-white flex items-center justify-between rounded-full shadow-md overflow-hidden">
            <input
              type="text"
              placeholder="Search friend"
              className="text-14 py-2 px-3 w-full"
            />
            <MagnifyingGlassIcon className="w-5 h-5 mr-3" />
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-1 h-full overflow-y-auto scrollbar scrollbar-w-1 scrollbar-track-slate-300 scrollbar-track-rounded-md scrollbar-thumb-primary scrollbar-thumb-rounded-md">
        {friends?.map(({ friendId, friend }: IFriend) => (
          <Link
            to={`/${friend.userName}`}
            state={friend.userId}
            key={friendId}
            className="flex gap-3 text-tertiary p-2 rounded-md cursor-pointer hover:bg-tertiary hover:bg-opacity-10 hover:shadow-sm"
            // onClick={}
          >
            <img
              src={friend.avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1 flex justify-between items-center ">
              <div className="flex flex-col gap-1">
                <span className="leading-none font-semibold">
                  {friend.realName}
                </span>
                <span className="text-14">@{friend.userName}</span>
              </div>
              <button className="w-6 h-6 flex justify-center leading-none hover:bg-opacity-20 rounded-full hover:bg-tertiary transition-all duration-200">
                <span className="select-none">...</span>
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Friend;
