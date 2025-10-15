import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../UI/InputField";
import Button from "../UI/Button";

/**
 * SignupForm component: Signup form with validation using react-hook-form.
 * Props: onSubmit callback receives form data { name, email, password, role }
 */
const SignupForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">Create an Account</h2>

      <InputField
        label="Full Name"
        id="name"
        placeholder="Your full name"
        register={register}
        required={true}
        error={errors.name}
      />

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

      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700" htmlFor="role">
          Account Type
        </label>
        <select
          id="role"
          {...register("role", { required: "Account type is required" })}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            errors.role ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select account type</option>
          <option value="seeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        {errors.role && (
          <span className="text-red-500 text-sm mt-1">{errors.role.message}</span>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignupForm;
