import { useEffect, useState } from "react";
import { jobsApi } from "../api/jobsApi";

/**
 * Custom hook to fetch jobs from API or mock.
 */
export const useFetchJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await jobsApi.getJobs();
      setJobs(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return { jobs, loading, error, fetchJobs };
};
