import Friends from '../components/Friends';
import NotFriends from '../components/NotFriends';
import UserOnline from '../components/UserOnline';
import Messages from '../pages/Messages';
import SChat from '../pages/SChat';
import Group from '../components/Group';
import Message from '../components/Message';
import Account from '../pages/Account';
import User from '../pages/User';

export const privateRoutes = [
  { path: '/schat', mainElement: <SChat />, rightPanel: <UserOnline /> },
  { path: '/messages', mainElement: <SChat />, rightPanel: <Message /> },
  { path: '/friends', mainElement: <NotFriends />, rightPanel: <Friends /> },
  { path: '/groups', mainElement: <Group />, rightPanel: <Group /> },
  { path: '/account', mainElement: <Account />, rightPanel: <Message /> },
  {
    path: '/messages/chat/:chatId',
    mainElement: <Messages />,
    rightPanel: <Message />,
  },
  {
    path: '/:userName',
    mainElement: <User />,
    rightPanel: <Friends />,
  },
];
