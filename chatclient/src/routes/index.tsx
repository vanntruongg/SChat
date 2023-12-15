import Friends from '../components/Friends';
import Connections from '../components/Connections';
import UserOnline from '../components/UserOnline';
import Messages from '../pages/Messages';
import SChat from '../pages/SChat';
import Group from '../components/Group';
import Message from '../components/Message';
import Account from '../pages/Account';

export const privateRoutes = [
  { path: '/schat', mainElement: <SChat />, rightPanel: <UserOnline /> },
  { path: '/messages', mainElement: <Messages />, rightPanel: <Message /> },
  { path: '/friends', mainElement: <Messages />, rightPanel: <Friends /> },
  { path: '/groups', mainElement: <Messages />, rightPanel: <Group /> },
  { path: '/account/:userId', mainElement: <Account />, rightPanel: <Group /> },
  {
    path: '/connections',
    mainElement: <Messages />,
    rightPanel: <Connections />,
  },
];
