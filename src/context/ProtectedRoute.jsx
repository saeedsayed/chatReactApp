import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loading from "../Pages/Loading";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) return <Loading />;
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
