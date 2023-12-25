import { ReactNode } from 'react';
import NavBar from './NavBar';
import UserInfor from './UserInfor';
import LogoApp from './LogoApp';

interface SidebarProps {
  sidebar: ReactNode;
}

const Sidebar = ({ sidebar }: SidebarProps) => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <LogoApp />
      <div className="flex h-full my-2">
        <NavBar />
        <div className="flex-1">{sidebar}</div>
      </div>
      <div className="">
        <UserInfor />
      </div>
    </div>
  );
};

export default Sidebar;
