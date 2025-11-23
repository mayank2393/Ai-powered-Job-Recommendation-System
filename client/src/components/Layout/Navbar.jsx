import React from "react";
import { Link, NavLink } from "react-router-dom";

/**
 * Navbar component: Top navigation bar for the job portal.
 * Includes logo and navigation links for Home, JobList, Login, Signup, and Dashboard.
 * Uses TailwindCSS for styling.
 */
const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          AI Job Portal
        </Link>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-indigo-600" : "hover:text-indigo-500"
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                isActive ? "text-indigo-600" : "hover:text-indigo-500"
              }
            >
              Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-indigo-600" : "hover:text-indigo-500"
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? "text-indigo-600" : "hover:text-indigo-500"
              }
            >
              Signup
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/seeker"
              className={({ isActive }) =>
                isActive ? "text-indigo-600" : "hover:text-indigo-500"
              }
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
