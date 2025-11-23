import React from "react";
import Sidebar from "../../components/Layout/Sidebar";
import EmployerDashboard from "../../components/Dashboard/EmployerDashboard";

/**
 * DashboardEmployer page: Layout with Sidebar and EmployerDashboard content.
 */
const DashboardEmployer = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <EmployerDashboard />
      </div>
    </div>
  );
};

export default DashboardEmployer;
