import friendService from '../../service/friend.service';

interface ButtonFriendRequestSent {
  userId: number;
  fetchData: () => void;
}

const ButtonFriendRequestSent: React.FC<ButtonFriendRequestSent> = ({ userId, fetchData }) => {
  const handleCancelFriendRequest = async (friendId: number) => {
    await friendService.cancelFriendRequest(friendId);
    console.log(123123);

    fetchData();
  };
  return (
    <div className="flex flex-col gap-1">
      <button
        className="py-2 border border-red-600 text-14 text-center text-red-600 font-semibold whitespace-nowrap rounded-md hover:scale-[1.02] hover:border-red-600 hover:bg-red-200 hover:text-red-600 transition-all duration-100"
        onClick={() => handleCancelFriendRequest(userId)}
      >
        Cancel request
      </button>
    </div>
  );
};

export default ButtonFriendRequestSent;
