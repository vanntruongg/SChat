import { FC, ReactNode } from 'react';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children, sidebar }) => {
  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="col-span-4">
        <Sidebar sidebar={sidebar} />
      </div>
      <div className="col-span-8 h-screen bg-tertiary text-secondary border-l ">{children}</div>
    </div>
  );
};

export default MainLayout;
