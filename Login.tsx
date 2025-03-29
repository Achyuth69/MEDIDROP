
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  useEffect(() => {
    // Set page title
    document.title = "Sign In - MediDrop";
  }, []);

  return (
    <Layout>
      <div className="container py-20">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;
