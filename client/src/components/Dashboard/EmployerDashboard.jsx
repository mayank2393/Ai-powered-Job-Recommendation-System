import React from "react";

/**
 * EmployerDashboard component: Dashboard page for employers.
 * Shows welcome message and placeholder for job postings management.
 */
const EmployerDashboard = () => {
  return (
    <main className="p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Welcome, Employer!</h1>
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Job Postings</h2>
        <p className="text-gray-600">You can manage your job postings here (Coming Soon).</p>
      </section>
    </main>
  );
};

export default EmployerDashboard;
