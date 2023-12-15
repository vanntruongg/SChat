import {
  Bars2Icon,
  Bars4Icon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';
import MessageSend from '../components/MessageSend';
import MessageReceive from '../components/MessageReceive';

const messageList = [
  {
    id: 1,
    sender: 1,
    message: 'Hello',
    time: '12:8',
  },
  {
    id: 2,
    sender: 2,
    message: 'Hi',
    time: '12:10',
  },
  {
    id: 3,
    sender: 1,
    message: 'What your name?',
    time: '12:16',
  },
  {
    id: 4,
    sender: 2,
    message: 'My name is Van Truong',
    time: '12:19',
  },
  {
    id: 5,
    sender: 1,
    message: 'Oh, Van Truong',
    time: '12:22',
  },
  {
    id: 5,
    sender: 1,
    message: 'Oh, Van Truong',
    time: '12:22',
  },
  // {
  //   id: 5,
  //   sender: 2,
  //   message: 'Oh, Van Truong',
  //   time: '12:22',
  // },
  // {
  //   id: 5,
  //   sender: 1,
  //   message: 'Oh, Van Truong',
  //   time: '12:22',
  // },
  // {
  //   id: 5,
  //   sender: 2,
  //   message: 'Oh, Van Truong',
  //   time: '12:22',
  // },
  // {
  //   id: 5,
  //   sender: 1,
  //   message: 'Oh, Van Truong',
  //   time: '12:22',
  // },
];

const Messages = () => {
  return (
    <div className="bg-primary text-secondary h-full flex flex-col justify-between">
      {/* header */}
      <header className="bg-quaternary flex justify-between items-center px-4 py-2 backdrop-blur-2xl shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-">Van Truong</span>
            <div className="flex items-center gap-1 text-14">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
        <div className="relative group">
          <Bars4Icon className="w-5 h-5" />
          <div className="absolute right-2.5 top-2.5 bg-secondary rounded-b-md rounded-tl-md origin-top-right scale-0 invisible group-hover:visible group-hover:scale-100 transition-all duration-300">
            <button className="w-full h-full text-red-600 whitespace-nowrap px-4 py-2 hover:bg-gray-200 hover:rounded-b-md hover:rounded-tl-md">
              Out group
            </button>
          </div>
        </div>
      </header>
      <div className="bg-tertiary flex flex-col justify-end text-secondary px-4 h-full scroll-smooth scrollbar-w-1 scrollbar scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-track-slate-700 scrollbar-thumb-primary overflow-y-auto">
        <ul className="my-10 gap-2">
          {messageList.map((message) => (
            <li key={message.id} className="">
              {message.sender === 1 ? (
                <div className="flex justify-end my-0.5">
                  <MessageSend message={message.message} time={message.time} />
                </div>
              ) : (
                <div className="flex my-0.5">
                  <MessageReceive
                    message={message.message}
                    time={message.time}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* form text message */}
      <div className="bg-quaternary shadow-md">
        <form className="">
          <div className="flex gap-2 m-4">
            <input
              type="text"
              placeholder="Type your message..."
              // value={message}
              // onChange={handleChangeInputMessage}
              className="w-full p-1.5 px-4 bg-tertiary border rounded-full placeholder:text-14"
              required
            />
            <button className="px-4 border bg-primary text-white font-semibold rounded-t-md rounded-bl-md hover:bg-opacity-90 transition-all duration-200 text-14">
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Messages;
