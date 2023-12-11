import { Outlet, Navigate, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import useAuth from "./hooks/useAuth";
const ProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return allowedRoles?.includes(auth?.user?.role) ? (
    <>
      <Navigation />
      {/* <Outlet /> */}
    </>
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
