import { Navigate, Outlet, useLocation } from "react-router-dom";
import useStore from "../store/useStore";

const AuthProvider = () => {
  const { user, loading } = useStore();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full text-center justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>;
      </div>
    );
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthProvider;
