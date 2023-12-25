import UserOnline from '../components/UserOnline';
import Messages from '../pages/Messages';
import SChat from '../pages/SChat';
import Group from '../components/Group';
import ListMessage from '../components/message/ListMessage';
import Account from '../pages/Account';
import User from '../pages/User';
import SidebarFriend from '../components/SidebarFriend';
import ListFriend from '../components/friend/ListFriend';
import FriendRequest from '../components/friend/FriendRequest';
import Suggestions from '../components/friend/Suggesstions';
import StartMessage from '../components/StartMessage';

export const privateRoutes = [
  { path: '/schat', mainElement: <SChat />, sidebar: <UserOnline /> },
  { path: '/messages', mainElement: <StartMessage />, sidebar: <ListMessage /> },
  { path: '/friends', mainElement: <SChat />, sidebar: <SidebarFriend /> },
  { path: '/groups', mainElement: <Group />, sidebar: <Group /> },
  { path: '/account', mainElement: <Account />, sidebar: <ListMessage /> },
  { path: '/friends/list', mainElement: <ListFriend />, sidebar: <SidebarFriend /> },
  { path: '/friends/requests', mainElement: <FriendRequest />, sidebar: <SidebarFriend /> },
  { path: '/friends/find', mainElement: <Suggestions />, sidebar: <SidebarFriend /> },
  {
    path: '/messages/c/:chatId',
    mainElement: <Messages />,
    sidebar: <ListMessage />,
  },
  {
    path: '/:userName',
    mainElement: <User />,
    sidebar: <SidebarFriend />,
  },
  {
    path: '/account/:userName',
    mainElement: <Account />,
    sidebar: <UserOnline />,
  },
];
