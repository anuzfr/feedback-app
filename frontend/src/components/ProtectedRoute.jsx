import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  if (!user || !user.token) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default ProtectedRoute;