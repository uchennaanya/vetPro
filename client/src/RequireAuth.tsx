import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();

  const userAuth = localStorage.getItem("userToken");

  return userAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/userslayout" state={{ from: location }} replace />
  );
};

export default RequireAuth;
