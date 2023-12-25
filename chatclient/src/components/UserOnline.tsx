import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
const UserOnline = () => {
  return (
    <div className="px-2 py-5 h-full flex flex-col gap-6">
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-primary bg-opacity-90 p-1 flex flex-col items-center justify-center rounded-xl relative">
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-600 rounded-full"></span>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="rounded-2xl"
          />
          <span className="text-14 text-secondary font-bold">Truong</span>
        </div>
        <div className="bg-primary bg-opacity-90 p-1 flex flex-col items-center justify-center rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="avatar"
            className="rounded-2xl"
          />
          <span className="text-14 text-secondary font-bold">Thu</span>
        </div>
        <div className="bg-primary bg-opacity-90 p-1 flex flex-col items-center justify-center rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="rounded-2xl"
          />
          <span className="text-14 text-secondary font-bold">Nhi</span>
        </div>
        <div className="bg-primary bg-opacity-90 p-1 flex flex-col items-center justify-center rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="rounded-2xl"
          />
          <span className="text-14 text-secondary font-bold">Thu</span>
        </div>
      </div>
      <div className="bg-white flex items-center justify-between rounded-full shadow-md overflow-hidden">
        <input
          type="text"
          placeholder="Search or start of message"
          className="text-14 py-2 px-3 w-full"
        />
        <MagnifyingGlassIcon className="w-5 h-5 mr-3" />
      </div>
    </div>
  );
};

export default UserOnline;
