// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
// This component checks if the user is authenticated before rendering the children components.
// If the user is not authenticated, it redirects them to the login page.
// The `useAuthState` hook from `react-firebase-hooks/auth` is used to manage the authentication state.