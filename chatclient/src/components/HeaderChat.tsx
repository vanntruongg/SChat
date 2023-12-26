import { Bars4Icon } from '@heroicons/react/24/solid';
import { IGroup, IUser } from '~/interfaces';
import AvatarDefault from '../assets/avatar_default.png';

interface HeaderChatProps {
  user?: IUser;
  group?: IGroup;
}

const HeaderChat = ({ user, group }: HeaderChatProps) => {
  return (
    <>
      {user ? (
        <header className="flex justify-between items-center p-2 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-4 h-full">
            <img
              src={user.avatar !== null ? user.avatar : AvatarDefault}
              alt="avatar"
              className="size-10 rounded-full"
            />
            <div className="flex flex-col gap-1">
              <span className="leading-none">{user.realName}</span>
              {user.online && (
                <div className="flex items-center gap-1 text-14 leading-none">
                  <div className="size-2.5 bg-green-500 rounded-full"></div>
                  <span className="text-12">Online</span>
                </div>
              )}
            </div>
          </div>

          <button className="relative group size-8 flex justify-center items-center rounded-full transition-all duration-200">
            <Bars4Icon className="size-4" />
            <div className="absolute right-6 bg-secondary rounded-full group-hover:visible invisible transition-all duration-200">
              <span className="w-full h-full text-tertiary text-14 whitespace-nowrap px-1 p-0.5 hover:bg-gray-200 rounded-full">
                Setting chat
              </span>
            </div>
          </button>
        </header>
      ) : (
        <></>
      )}
    </>
  );
};

export default HeaderChat;
