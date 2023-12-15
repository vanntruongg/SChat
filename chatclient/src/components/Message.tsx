import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import User from '~/interfaces/user';

const userList: User[] = [
  {
    userId: 1,
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    userName: 'vanturong123412313',
    realName: 'Van Truong',
    email: 'vantruong@gmail.com',
  },
  {
    userId: 1,
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    userName: 'vanturong123412313',
    realName: 'Van Truong',
    email: 'vantruong@gmail.com',
  },
  {
    userId: 1,
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    userName: 'vanturong123412313',
    realName: 'Van Truong',
    email: 'vantruong@gmail.com',
  },
  {
    userId: 1,
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    userName: 'vanturong123412313',
    realName: 'Van Truong',
    email: 'vantruong@gmail.com',
  },
  {
    userId: 1,
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
    userName: 'vanturong123412313',
    realName: 'Van Truong',
    email: 'vantruong@gmail.com',
  },
];
const Message = () => {
  return (
    <div className="px-4 py-2 bg-secondary flex flex-col justify-between gap-4 h-full">
      <div className="">
        <h3 className="font-bold text-20 mb-2">Messages</h3>
        <form action="">
          <div className="bg-white flex items-center justify-between rounded-full shadow-md overflow-hidden">
            <input
              type="text"
              placeholder="Search message"
              className="text-14 py-2 px-3 w-full"
            />
            <MagnifyingGlassIcon className="w-5 h-5 mr-3" />
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-2 h-full overflow-y-auto scrollbar scrollbar-w-1 scrollbar-track-slate-300 scrollbar-track-rounded-md scrollbar-thumb-primary scrollbar-thumb-rounded-md">
        <div className="flex justify-between gap-1 bg-primary text-secondary p-2 rounded-md">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <div className="overflow-hidden">
            <h3>Van Truong</h3>
            <p className="text-14 whitespace-nowrap">
              Lorem ipsum dolor sit amet consectetur
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-1 bg-gray-100 p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <div className="overflow-hidden">
            <h3>Van Truong</h3>
            <p className="text-14 whitespace-nowrap">
              Lorem ipsum dolor sit amet consectetur
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-1 bg-gray-100 p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <div className="overflow-hidden">
            <h3>Van Truong</h3>
            <p className="text-14 whitespace-nowrap">
              Lorem ipsum dolor sit amet consectetur
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-1 bg-gray-100 p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <div className="overflow-hidden">
            <h3>Van Truong</h3>
            <p className="text-14 whitespace-nowrap">
              Lorem ipsum dolor sit amet consectetur
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-1 bg-gray-100 p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <div className="overflow-hidden">
            <h3>Van Truong</h3>
            <p className="text-14 whitespace-nowrap">
              Lorem ipsum dolor sit amet consectetur
            </p>
          </div>
        </div>

        {/* {userList.map(({ userId, avatar, realName }: User) => (
          <div key={userId} className="border rounded-lg">
            <img src={avatar} alt="avatar" className="rounded-t-lg" />
            <div className="p-2 min-h-[100px] flex flex-col justify-between items-baseline bg-tertiary bg-opacity-40 rounded-b-lg">
              <Link
                to={''}
                className="text-secondary font-semibold hover:underline hover:text-opacity-70"
              >
                {realName}
              </Link>
              <button className="w-full px-4 py-2 bg-primary bg-opacity-50 text-14 text-secondary font-medium rounded-md hover:bg-opacity-70 transition-all duration-100">
                Add friend
              </button>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Message;
