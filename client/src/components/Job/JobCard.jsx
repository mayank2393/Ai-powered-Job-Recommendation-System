import React from "react";
import { Link } from "react-router-dom";

/**
 * JobCard component: Displays job summary info.
 * Shows AI Match % badge.
 * Props: job {id, title, company, location, salary, matchPercent}
 */
const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-indigo-700">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
          <p className="text-gray-500 text-sm">{job.location}</p>
          <p className="text-gray-700 font-medium mt-1">{job.salary}</p>
        </div>
        <div className="ml-4">
          <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
            AI Match: {job.matchPercent}%
          </span>
        </div>
      </div>
      <Link
        to={`/jobs/${job.id}`}
        className="mt-4 inline-block text-indigo-600 hover:underline font-medium"
      >
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
