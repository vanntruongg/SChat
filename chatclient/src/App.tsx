import Login from './pages/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes } from './routes';
import MainLayout from './layouts/MainLayout';
import Register from './pages/Register';
import PrivateRoute from './routes/PrivateRoute';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/login'} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        {privateRoutes.map((route) => {
          const children = route.mainElement;
          const rightPanel = route.rightPanel;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <MainLayout rightPanel={rightPanel}>{children}</MainLayout>
              }
            />
          );
        })}
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default App;
