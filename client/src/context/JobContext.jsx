import React, { createContext, useContext, useState, useEffect } from "react";
import { jobsApi } from "../api/jobsApi";

const JobContext = createContext(null);

/**
 * JobProvider manages jobs state globally.
 */
export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await jobsApi.getJobs();
      setJobs(data);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <JobContext.Provider value={{ jobs, loading, refreshJobs: fetchJobs }}>
      {children}
    </JobContext.Provider>
  );
};

/**
 * Hook to access job context.
 */
export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext must be used within JobProvider");
  }
  return context;
};
