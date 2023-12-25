import { Link } from 'react-router-dom';
import Notification from './Notification';

const LogoApp = () => {
  return (
    <div className="flex items-center justify-between gap-2 p-2 shadow-md">
      <Link
        to={'/schat'}
        className="flex justify-center items-center gap-1 text-20 h-full font-semibold group"
      >
        <h2 className="bg-secondary text-primary w-10 h-8 flex justify-center items-center rounded-t-md rounded-bl-md group-hover:bg-primary group-hover:text-secondary transition-all duration-200">
          S
        </h2>
        <span className="">Chat</span>
      </Link>
      <Notification />
    </div>
  );
};

export default LogoApp;
