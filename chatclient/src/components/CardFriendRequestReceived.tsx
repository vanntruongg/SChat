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

const CardFriendRequestReceived = ({ friendId, user, fetchData }: CardFriendProps) => {
  const { user: userLogin } = useSelector((state: RootState) => state.auth);

  const confirmFriendRequest = async (friendId: number) => {
    if (userLogin) {
      const res = await friendService.confirmFriendRequest(friendId);
      if (res) {
        fetchData();
      }
    }
  };

  const deleteFriendRequest = async (friendId: number) => {
    if (userLogin) {
      const res = await friendService.deleteFriendRequest(friendId);
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
        <div className="flex flex-col gap-1">
          <button
            className="w-ful px-4 py-2 bg-primary text-14 text-secondary font-medium rounded-md hover:scale-[1.02] transition-all duration-100"
            onClick={() => confirmFriendRequest(friendId)}
          >
            Confirm
          </button>
          <button
            className="w-ful px-4 py-2 text-14 border border-gray-500 font-medium rounded-md hover:scale-[1.02] transition-all duration-100 hover:border-red-600 hover:text-red-600"
            onClick={() => deleteFriendRequest(friendId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardFriendRequestReceived;
