import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import userService from '../../service/user.service';
import { RootState } from '../../redux/store';
import { IUser } from '../../interfaces';
import { SidebarType, TypeUser } from '../../enums';
import ListUser from './ListUser';

const Suggestions = () => {
  const { user: userLogin } = useSelector((state: RootState) => state.auth);
  const [allUser, setAllUser] = useState<IUser[]>([]);
  const fetchData = async () => {
    try {
      const resAllUser = await userService.getAllUserNotFriends(userLogin?.userId);
      setAllUser(resAllUser);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(allUser);

  return (
    <ListUser
      title={SidebarType.Suggestions}
      users={allUser}
      type={TypeUser.User}
      fetchData={fetchData}
    />
  );
};

export default Suggestions;
