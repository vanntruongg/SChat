import friendService from '../../service/friend.service';

interface ButtonFriendRequestReceivedProps {
  userId: number;
  fetchData: () => void;
}

const ButtonFriendRequestReceived = ({ userId, fetchData }: ButtonFriendRequestReceivedProps) => {
  const handleConfirmFriendRequest = async (friendId: number) => {
    await friendService.confirmFriendRequest(friendId);
    fetchData();
  };

  const handleDeleteFriendRequest = async (friendId: number) => {
    await friendService.deleteFriendRequest(friendId);
    fetchData();
  };
  return (
    <div className="flex flex-col gap-1">
      <button
        className="py-2 px-4 bg-primary text-14 text-center text-secondary font-semibold rounded-md hover:scale-[1.02] transition-all duration-100"
        onClick={() => handleConfirmFriendRequest(userId)}
      >
        Confirm
      </button>
      <button
        className="px-4 py-2 border border-red-600 text-14 text-center text-red-600 font-semibold rounded-md hover:scale-[1.02] hover:border-red-600 hover:bg-red-200 hover:text-red-600 transition-all duration-100"
        onClick={() => handleDeleteFriendRequest(userId)}
      >
        Delete
      </button>
    </div>
  );
};

export default ButtonFriendRequestReceived;
