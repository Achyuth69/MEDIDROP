
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, isAuthenticated, loading } = useAuth();
  
  // If auth is still loading, show nothing (or a loading spinner)
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If role is required and doesn't match, redirect to appropriate dashboard
  if (requiredRole && user.role !== requiredRole) {
    if (user.role === "patient") {
      return <Navigate to="/patient-dashboard" />;
    } else if (user.role === "doctor") {
      return <Navigate to="/doctor-dashboard" />;
    } else if (user.role === "pharmacy") {
      return <Navigate to="/pharmacy-dashboard" />;
    }
    
    // Fallback if role doesn't match any known value
    return <Navigate to="/" />;
  }
  
  // If all checks pass, render the children
  return children;
};

export default ProtectedRoute;
