import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Sidebar component: Vertical sidebar navigation for dashboard pages.
 * Contains links for Seeker and Employer dashboards.
 * Uses TailwindCSS for styling.
 */
const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-6 text-indigo-600">Dashboard</h2>
      <nav className="flex flex-col space-y-4 text-gray-700">
        <NavLink
          to="/dashboard/seeker"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-indigo-600"
              : "hover:text-indigo-500"
          }
        >
          Job Seeker
        </NavLink>
        <NavLink
          to="/dashboard/employer"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-indigo-600"
              : "hover:text-indigo-500"
          }
        >
          Employer
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
