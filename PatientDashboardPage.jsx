
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PatientDashboard from "@/components/dashboard/PatientDashboard";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const PatientDashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Set page title
    document.title = "Patient Dashboard - MediDrop";
  }, []);

  // Check if user is authenticated and is a patient
  if (!isAuthenticated || user?.role !== 'patient') {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <PatientDashboard />
    </Layout>
  );
};

export default PatientDashboardPage;
