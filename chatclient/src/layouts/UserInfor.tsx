import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice';
import AvatarDefault from '../assets/avatar_default.png';
import authService from '../service/auth.service';

const UserInfor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="px-4 py-2 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <img src={user?.avatar ?? AvatarDefault} alt="" className="w-12 h-12 rounded-full" />
        <div className="flex flex-col text-14 text-secondary font-medium w-32 overflow-hidden">
          <span>{user?.realName}</span>
          <span>{`@${user?.userName}`}</span>
        </div>
      </div>
      <div className="relative group">
        <Cog6ToothIcon className="w-5 h-5 text-secondary" />
        <div className="absolute bottom-2 right-2 bg-secondary rounded-t-md rounded-bl-md invisible scale-0 group-hover:scale-100 group-hover:visible origin-bottom-right transition-all duration-300">
          <ul className="text-quaternary font-bold">
            <li className="border-b">
              <Link
                to={`/account/${user?.userName}`}
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
  );
};

export default UserInfor;
