import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../UI/InputField";
import Button from "../UI/Button";

/**
 * LoginForm component: Login form with validation using react-hook-form.
 * Props: onSubmit callback receives form data { email, password }
 */
const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">Login to Your Account</h2>

      <InputField
        label="Email"
        id="email"
        type="email"
        placeholder="you@example.com"
        register={register}
        required={true}
        error={errors.email}
      />
      <InputField
        label="Password"
        id="password"
        type="password"
        placeholder="********"
        register={register}
        required={true}
        error={errors.password}
      />

      <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
