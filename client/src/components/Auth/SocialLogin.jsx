import React from "react";

/**
 * SocialLogin component: Placeholder social login buttons.
 * Add integration as needed.
 */
const SocialLogin = () => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        aria-label="Continue with Google"
        className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
      >
        Google
      </button>
      <button
        aria-label="Continue with Facebook"
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
      >
        Facebook
      </button>
      <button
        aria-label="Continue with LinkedIn"
        className="bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-800 transition"
      >
        LinkedIn
      </button>
    </div>
  );
};

export default SocialLogin;
