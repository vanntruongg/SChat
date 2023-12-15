import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import User from '~/interfaces/user';

const userList: User[] = [
  {
    userId: 1,
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    userName: 'vantruong123456',
    realName: 'Van Truong',
    email: 'vantruong@gmail.com',
  },
  {
    userId: 1,
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    userName: 'vantruong123456',
    realName: 'Van Truong',
    email: 'vantruong@gmail.com',
  },
  {
    userId: 1,
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    userName: 'vantruong123456',
    realName: 'Van Truong',
    email: 'vantruong@gmail.com',
  },
  {
    userId: 1,
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    userName: 'vantruong123456',
    realName: 'Van Truong',
    email: 'vantruong@gmail.com',
  },
  {
    userId: 1,
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    userName: 'vantruong123456',
    realName: 'Van Truong',
    email: 'vantruong@gmail.com',
  },
];
const Friend = () => {
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
        {userList.map(({ userId, avatar, userName, realName }: User) => (
          <div
            key={userId}
            className="flex gap-1 text-tertiary p-2 rounded-md cursor-pointer hover:bg-tertiary hover:bg-opacity-10 hover:shadow-sm"
            // onClick={}
          >
            <img src={avatar} alt="avatar" className="w-12 h-12 rounded-full" />
            <div className="flex-1 flex justify-between items-center ">
              <div className="flex flex-col gap-1">
                <span className="leading-none">{realName}</span>
                <span className="text-10">@{userName}</span>
              </div>
              <button className="w-6 h-6 flex justify-center leading-none hover:bg-opacity-20 rounded-full hover:bg-tertiary transition-all duration-200">
                <span className="select-none">...</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friend;
