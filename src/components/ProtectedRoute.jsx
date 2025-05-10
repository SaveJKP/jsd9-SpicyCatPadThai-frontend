import { Navigate } from "react-router-dom";
import { useAuth } from "../context/userContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Wait for auth check

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
