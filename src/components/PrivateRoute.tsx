// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return user ? (
    <>{children}</>
  ) : (
    <Navigate to="/auth" replace state={{ from: location }} />
  );
};

export default PrivateRoute;