
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  useEffect(() => {
    // Set page title
    document.title = "Create Account - MediDrop";
  }, []);

  return (
    <Layout>
      <div className="container py-20">
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default Register;
