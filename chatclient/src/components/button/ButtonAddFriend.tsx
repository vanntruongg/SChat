import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import friendService from '../../service/friend.service';

interface ButtonAddFriendProps {
  userId: number;
  fetchData: () => void;
}

const ButtonAddFriend = ({ userId, fetchData }: ButtonAddFriendProps) => {
  const { user: userLogin } = useSelector((state: RootState) => state.auth);

  const friendRequest = async (id: number) => {
    if (userLogin) {
      await friendService.friendRequest(userLogin.userId, id);
      fetchData();
    }
  };
  return (
    <div className="flex flex-col gap-1">
      <button
        className="px-4 py-2 bg-primary text-14 text-center text-secondary font-semibold text-pretty rounded-md hover:scale-[1.02] transition-all duration-100"
        onClick={() => friendRequest(userId)}
      >
        Add friend
      </button>
    </div>
  );
};

export default ButtonAddFriend;
