
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PharmacyDashboard from "@/components/dashboard/PharmacyDashboard";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const PharmacyDashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Set page title
    document.title = "Pharmacy Dashboard - MediDrop";
  }, []);

  // Check if user is authenticated and is a pharmacy
  if (!isAuthenticated || user?.role !== 'pharmacy') {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <PharmacyDashboard />
    </Layout>
  );
};

export default PharmacyDashboardPage;
