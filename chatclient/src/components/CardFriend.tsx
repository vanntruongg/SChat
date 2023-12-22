import { Link } from 'react-router-dom';
import { IUser } from '~/interfaces';
import AvatarDefault from '../assets/avatar_default.png';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import friendService from '../service/friend.service';

interface CardFriendProps {
  friend: IUser;
  fetchData: () => void;
}

const CardFriend = ({ friend, fetchData }: CardFriendProps) => {
  const { user: userLogin } = useSelector((state: RootState) => state.auth);

  const handleFriendRequest = async (userId: number) => {
    if (userLogin) {
      const res = await friendService.friendRequest(userLogin.userId, userId);
      if (res) {
        fetchData();
      }
    }
  };
  return (
    <div key={friend.userId} className="flex flex-col bg-secondary border rounded-md">
      <Link to={`/${friend.userName}`} state={friend.userId} className="rounded-md overflow-hidden">
        <img
          src={friend.avatar ?? AvatarDefault}
          alt="avatar"
          className="rounded-t-lg h-full w-full hover:scale-105  transition-all duration-200"
        />
      </Link>
      <div className="p-3 flex flex-col gap-3">
        <div>
          <Link
            to={`/${friend.userName}`}
            className="text-quaternary font-semibold hover:underline hover:text-opacity-70"
          >
            <span>{friend.realName}</span>
          </Link>
        </div>
        <button
          className="w-ful px-4 py-2 bg-primary text-14 text-secondary font-medium rounded-md hover:scale-[1.02] transition-all duration-100"
          onClick={() => handleFriendRequest(friend.userId)}
        >
          Add friend
        </button>
      </div>
    </div>
  );
};

export default CardFriend;
