import { Link } from 'react-router-dom';
import { IUser } from '~/interfaces';
import AvatarDefault from '../assets/avatar_default.png';
import friendService from '../service/friend.service';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
interface CardFriendProps {
  friendId: number;
  user: IUser;
  fetchData: () => void;
}

const CardFriendRequestSent = ({ friendId, user, fetchData }: CardFriendProps) => {
  const { user: userLogin } = useSelector((state: RootState) => state.auth);

  const cancelFriendRequest = async (friendId: number) => {
    if (userLogin) {
      const res = await friendService.cancelFriendRequest(friendId);
      if (res) {
        fetchData();
      }
    }
  };
  return (
    <div key={user.userId} className="flex flex-col bg-secondary border rounded-md">
      <Link to={`/${user.userName}`} state={user.userId} className="rounded-md overflow-hidden">
        <img
          src={user.avatar ?? AvatarDefault}
          alt="avatar"
          className="rounded-t-lg h-full w-full hover:scale-105  transition-all duration-200"
        />
      </Link>
      <div className="p-3 flex flex-col gap-3">
        <div>
          <Link
            to={`/${user.userName}`}
            className="text-quaternary font-semibold hover:underline hover:text-opacity-70"
          >
            <span>{user.realName}</span>
          </Link>
        </div>
        <button
          className="w-ful px-4 py-2 bg-primary text-14 text-secondary font-medium rounded-md hover:scale-[1.02] transition-all duration-100"
          onClick={() => cancelFriendRequest(friendId)}
        >
          UnSent
        </button>
      </div>
    </div>
  );
};

export default CardFriendRequestSent;
