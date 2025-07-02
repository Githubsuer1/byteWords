// components/PrivateRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isLoggin);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
