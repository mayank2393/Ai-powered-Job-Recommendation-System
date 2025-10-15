import React from "react";
import SkillGapChart from "./SkillGapChart";

/**
 * SeekerDashboard component: Dashboard page for job seekers.
 * Shows welcome message and skill gap chart.
 */
const SeekerDashboard = () => {
  return (
    <main className="p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Welcome, Job Seeker!</h1>
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Skill Gap Analysis</h2>
        <SkillGapChart />
      </section>
    </main>
  );
};

export default SeekerDashboard;
