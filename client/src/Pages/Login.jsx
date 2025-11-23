import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import SocialLogin from "../components/Auth/SocialLogin";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

/**
 * Login page: Contains LoginForm and SocialLogin components.
 */
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard/seeker"); // redirect on success
    } catch (error) {
      alert(error.message || "Login failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <LoginForm onSubmit={onSubmit} />
        <SocialLogin />
      </div>
    </main>
  );
};

export default Login;
