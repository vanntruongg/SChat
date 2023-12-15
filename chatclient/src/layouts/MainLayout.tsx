import { FC, ReactNode } from 'react';
import SideBar from '../components/SideBar';

interface MainLayoutProps {
  children: ReactNode;
  rightPanel: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children, rightPanel }) => {
  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="col-span-2">
        <SideBar />
      </div>
      <div className="col-span-7 h-screen">{children}</div>
      <div className="col-span-3 h-screen">{rightPanel}</div>
    </div>
  );
};

export default MainLayout;
