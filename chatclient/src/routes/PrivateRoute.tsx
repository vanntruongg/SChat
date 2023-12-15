import { Navigate, Outlet } from 'react-router-dom';
import authService from '../service/auth.service';

const PrivateRoute = () => {
  const isLoggedIn = authService.isLoggedIn();
  return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />;
};

export default PrivateRoute;
