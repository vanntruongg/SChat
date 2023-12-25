import { v4 as uuid } from 'uuid';
import {
  ChatBubbleLeftRightIcon,
  UsersIcon,
  UserGroupIcon,
  HomeIcon,
} from '@heroicons/react/24/solid';

import { RiUserAddLine, RiUserFollowLine, RiUserSharedLine } from 'react-icons/ri';
import { SidebarType } from '../enums';

export const navbarLinks = [
  {
    id: uuid(),
    link: '/schat',
    title: 'SChat',
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    id: uuid(),
    link: '/messages',
    title: 'messages',
    icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
  },
  {
    id: uuid(),
    link: '/friends',
    title: 'friend',
    icon: <UsersIcon className="w-6 h-6" />,
  },
  {
    id: uuid(),
    link: '/groups',
    title: 'group',
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
];

export const friendsLinks = [
  {
    id: uuid(),
    link: '/friends/list',
    title: SidebarType.AllFriend,
    icon: <RiUserFollowLine className="w-5 h-5" />,
  },
  {
    id: uuid(),
    link: '/friends/requests',
    title: SidebarType.FriendRequests,
    icon: <RiUserSharedLine className="w-5 h-5" />,
  },
  {
    id: uuid(),
    link: '/friends/find',
    title: SidebarType.Suggestions,
    icon: <RiUserAddLine className="w-5 h-5" />,
  },
];
