import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobDetails from "../components/Job/JobDetails";
import { useFetchJobs } from "../hooks/useFetchJobs";
import Button from "../components/UI/Button";

/**
 * JobDetails page: Shows detailed info for a job + application form.
 */
const JobDetailsPage = () => {
  const { id } = useParams();
  const { jobs, loading } = useFetchJobs();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (!loading) {
      const foundJob = jobs.find((j) => String(j.id) === id);
      setJob(foundJob || null);
    }
  }, [loading, jobs, id]);

  // Dummy apply handler
  const handleApply = () => {
    setApplied(true);
  };

  if (loading) return <p className="p-6">Loading job details...</p>;
  if (!job) return <p className="p-6 text-red-600">Job not found.</p>;

  return (
    <main className="container mx-auto p-6 max-w-3xl">
      <JobDetails job={job} />

      {!applied ? (
        <Button onClick={handleApply} className="mt-6">
          Apply for this job
        </Button>
      ) : (
        <p className="mt-6 text-green-600 font-semibold">
          Successfully applied! Good luck.
        </p>
      )}
    </main>
  );
};

export default JobDetailsPage;
