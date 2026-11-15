import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "./useAuth";

const ProtectedRoute = () => {
  const { token, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#10141a] text-cyan-400">
        <span className="font-mono text-xs uppercase tracking-widest">
          Establishing secure link...
        </span>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
