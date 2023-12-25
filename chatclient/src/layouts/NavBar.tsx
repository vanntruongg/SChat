import { Link, useLocation } from 'react-router-dom';
import { navbarLinks } from '../static';

const NavBar = () => {
  const location = useLocation();
  const pathName: string = location.pathname;

  return (
    <div className="mx-1 bg-gradient-to-b from-primary to-gray-500 shadow-md text-secondary rounded-full">
      <ul className="p-3 flex flex-col  h-full justify-around">
        {navbarLinks.map(({ id, link, title, icon }) => (
          <li key={id} className="py-6">
            <Link
              to={link}
              className={`capitalize flex items-center gap-3 hover:opacity-100 ${
                pathName === link ? 'opacity-100' : 'opacity-30'
              }`}
            >
              {icon}
              {/* <span>{title}</span> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
