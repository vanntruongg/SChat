import friendService from '../../service/friend.service';

interface ButtonUnFriendProps {
  friendId: number;
  fetchData: () => void;
}

const ButtonUnFriend: React.FC<ButtonUnFriendProps> = ({ friendId, fetchData }) => {
  const handleUnfriend = async (friendId: number) => {
    await friendService.deleteFriendRequest(friendId);
    fetchData();
  };
  return (
    <div className="flex flex-col gap-1">
      <button
        className="px-4 py-2 border border-red-600 text-14 text-center text-red-600 font-semibold text-pretty rounded-md hover:scale-[1.02] hover:border-red-600 hover:text-red-600 hover:bg-red-200 transition-all duration-100"
        onClick={() => handleUnfriend(friendId)}
      >
        Unfriend
      </button>
    </div>
  );
};

export default ButtonUnFriend;
