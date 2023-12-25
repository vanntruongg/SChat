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
      <div className="col-span-8 h-screen overflow-y-auto bg-tertiary text-secondary border-l scrollbar scrollbar-w-1 scrollbar-track-slate-300 scrollbar-track-rounded-md scrollbar-thumb-primary scrollbar-thumb-rounded-md">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
