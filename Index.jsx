
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "MediDrop - Healthcare at Your Doorstep";
  }, []);

  // Redirect to the Home page
  return <Navigate to="/home" />;
};

export default Index;
