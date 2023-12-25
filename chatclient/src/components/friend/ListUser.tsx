import { IFriend, IUser, isIFriend } from '../../interfaces';
import CardFriend from './CardFriend';
import { TypeUser } from '../../enums';

interface ListUserProps {
  title: string;
  users: IFriend[] | IUser[];
  type: TypeUser;
  fetchData: () => void;
}

const ListUser = ({ title, users, type, fetchData }: ListUserProps) => {
  return (
    <div className="h-full">
      {users.length > 0 && (
        <div className="p-5 ">
          <h2 className="text-24 font-bold">{title}</h2>

          <div className="grid grid-cols-6 gap-4 py-4">
            {users?.map((user: IFriend | IUser) => (
              <CardFriend
                key={isIFriend(user) ? user.friend.userId : user?.userId}
                friendOrUser={user}
                type={type}
                fetchData={fetchData}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListUser;
