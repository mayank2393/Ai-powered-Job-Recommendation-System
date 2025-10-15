import React from "react";

/**
 * InputField component: Reusable input with label and error messaging.
 * Props: label, id, type, register (from react-hook-form), error, placeholder, etc.
 */
const InputField = ({
  label,
  id,
  type = "text",
  register,
  required = false,
  error,
  placeholder = "",
  ...rest
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...(register ? register(id, { required }) : {})}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...rest}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message || "This field is required"}</span>
      )}
    </div>
  );
};

export default InputField;
