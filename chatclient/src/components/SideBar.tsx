import { Link, useLocation, useNavigate } from 'react-router-dom';
import { sidebarLinks } from '../constant/sidebar';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import AvatarDefault from '../assets/avatar_default.png';
import authService from '../service/auth.service';
import { logout } from '../redux/authSlice';

const SideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathName: string = location.pathname;

  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="bg-quaternary text-secondary h-full flex flex-col justify-between border-r border-gray-100">
      <div>
        <Link
          to={'/schat'}
          className="flex justify-center items-center gap-1 text-20 font-semibold p-4 group"
        >
          <h2 className="bg-secondary text-primary w-10 h-8 flex justify-center items-center rounded-t-md rounded-bl-md group-hover:bg-primary group-hover:text-secondary transition-all duration-200">
            S
          </h2>
          <span className="">Chat</span>
        </Link>
        <ul className="p-4">
          {sidebarLinks.map(({ id, link, title, icon }) => (
            <li key={id} className="py-4">
              <Link
                to={link}
                className={`capitalize flex items-center gap-3 hover:opacity-100 ${
                  pathName === link
                    ? 'opacity-100'
                    : 'opacity-40 hover:text-primary'
                }`}
              >
                {icon}
                <span>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <img
            src={user?.avatar ?? AvatarDefault}
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col text-14 w-32 overflow-hidden">
            <span>{user?.realName}</span>
            <span>{`@${user?.userName}`}</span>
          </div>
        </div>
        <div className="relative group">
          <Cog6ToothIcon className="w-5 h-5" />
          <div className="absolute bottom-2 right-2 bg-secondary rounded-t-md rounded-bl-md invisible scale-0 group-hover:scale-100 group-hover:visible origin-bottom-right transition-all duration-300">
            <ul className="text-quaternary">
              <li className="border-b">
                <Link
                  to={`/${user?.userName}`}
                  state={user?.userId}
                  className="block p-1 px-8 hover:bg-gray-200 rounded-t-md"
                >
                  <span className="">Account</span>
                </Link>
              </li>
              <li className="">
                <button
                  className="w-full p-1 px-8 hover:bg-gray-200 rounded-bl-md"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
