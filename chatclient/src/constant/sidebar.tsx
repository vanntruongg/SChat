import {
  ChatBubbleLeftRightIcon,
  UsersIcon,
  UserGroupIcon,
  UserPlusIcon,
  HomeIcon,
} from '@heroicons/react/24/solid';

export const sidebarLinks = [
  {
    id: 0,
    link: '/schat',
    title: 'SChat',
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    id: 1,
    link: '/messages',
    title: 'messages',
    icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />,
  },
  {
    id: 2,
    link: '/friends',
    title: 'friend',
    icon: <UsersIcon className="w-5 h-5" />,
  },
  {
    id: 3,
    link: '/groups',
    title: 'group',
    icon: <UserGroupIcon className="w-5 h-5" />,
  },
];
