import React from "react";

/**
 * JobDetails component: Detailed view of a selected job.
 * Props: job - object containing detailed job info.
 */
const JobDetails = ({ job }) => {
  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-1">{job.company}</p>
      <p className="text-gray-500 mb-3">{job.location}</p>
      <p className="font-semibold text-gray-700 mb-3">Salary: {job.salary}</p>
      <p className="mb-4">{job.description}</p>

      <h3 className="font-semibold mb-1">Required Skills:</h3>
      <ul className="list-disc list-inside mb-4">
        {job.skills?.map((skill, idx) => (
          <li key={idx} className="text-gray-700">
            {skill}
          </li>
        ))}
      </ul>

      <h3 className="font-semibold mb-1">Job Type:</h3>
      <p className="mb-3">{job.jobType}</p>

      <h3 className="font-semibold mb-1">Experience Required:</h3>
      <p className="mb-3">{job.experience}</p>

      <h3 className="font-semibold mb-1">AI Match Percentage:</h3>
      <p className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
        {job.matchPercent}%
      </p>
    </div>
  );
};

export default JobDetails;
