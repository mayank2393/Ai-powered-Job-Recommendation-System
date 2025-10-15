import React from "react";
import Sidebar from "../../components/Layout/Sidebar";
import SeekerDashboard from "../../components/Dashboard/SeekerDashboard";

/**
 * DashboardSeeker page: Layout with Sidebar and SeekerDashboard content.
 */
const DashboardSeeker = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <SeekerDashboard />
      </div>
    </div>
  );
};

export default DashboardSeeker;
