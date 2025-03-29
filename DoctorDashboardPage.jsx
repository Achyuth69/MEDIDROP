
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import DoctorDashboard from "@/components/dashboard/DoctorDashboard";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const DoctorDashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Set page title
    document.title = "Doctor Dashboard - MediDrop";
  }, []);

  // Check if user is authenticated and is a doctor
  if (!isAuthenticated || user?.role !== 'doctor') {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <DoctorDashboard />
    </Layout>
  );
};

export default DoctorDashboardPage;
