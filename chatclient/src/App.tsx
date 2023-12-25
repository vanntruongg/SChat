import Login from './pages/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes } from './routes';
import MainLayout from './layouts/MainLayout';
import Register from './pages/Register';
import PrivateRoute from './routes/PrivateRoute';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import useSocket from './hooks/useSocket';
import { NotificationEvent } from './enums';
import SocketProvider from './context/SocketProvider';

const App = () => {
  // const notification = useSelector((state: RootState) => state.notification);
  // const { user } = useSelector((state: RootState) => state.auth);

  // const socket = useSocket({ userId: user?.userId });
  // useEffect(() => {
  //   if (socket) {
  //     socket.connect();
  //     console.log('connect');
  //     socket.on(NotificationEvent.FriendRequest, (notification) => {
  //       toast(notification);
  //     });
  //   }
  //   return () => {
  //     if (socket?.connected) {
  //       console.log('disconnect');
  //       socket.disconnect();
  //     }
  //   };
  // }, [socket]);

  return (
    <>
      <SocketProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to={'/login'} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            {privateRoutes.map((route) => {
              const children = route.mainElement;
              const sidebar = route.sidebar;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<MainLayout sidebar={sidebar}>{children}</MainLayout>}
                />
              );
            })}
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
      </SocketProvider>
    </>
  );
};

export default App;
