import { Link, useLocation } from 'react-router-dom';
import { friendsLinks } from '../static';

const SidebarFriend = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div>
      <ul className="pl-1 pr-2">
        {friendsLinks.map(({ id, link, title, icon }) => (
          <li key={id} className="">
            <Link
              to={link}
              className={`p-2 bg-quaternary text-secondary font-medium capitalize flex items-center gap-3 rounded-md
                hover:bg-opacity-50 hover:bg-gray-500 
                ${pathname === link ? 'bg-gray-500 bg-opacity-50' : 'bg-transparent'}`}
            >
              <div
                className={`
                w-10 h-10 flex items-center justify-center rounded-full
                ${pathname === link ? 'bg-secondary text-primary' : 'bg-quaternary'}
              `}
              >
                {icon}
              </div>
              <span>{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarFriend;
