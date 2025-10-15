import React from "react";
import SignupForm from "../components/Auth/SignupForm";
import SocialLogin from "../components/Auth/SocialLogin";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

/**
 * Signup page: Contains SignupForm with validation and SocialLogin.
 */
const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signup(data.name, data.email, data.password, data.role);
      navigate("/dashboard/seeker"); // redirect post signup
    } catch (error) {
      alert(error.message || "Signup failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <SignupForm onSubmit={onSubmit} />
        <SocialLogin />
      </div>
    </main>
  );
};

export default Signup;
