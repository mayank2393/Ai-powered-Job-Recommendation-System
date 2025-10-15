import { useState, useEffect } from "react";
import { aiMatchApi } from "../api/aiMatchApi";

/**
 * Custom hook to fetch AI matching recommendations for jobs.
 * Accepts job list, returns jobs augmented with match percentage.
 */
export const useAIRecommendations = (jobs) => {
  const [jobsWithMatch, setJobsWithMatch] = useState([]);

  useEffect(() => {
    if (!jobs.length) {
      setJobsWithMatch([]);
      return;
    }

    const fetchMatches = async () => {
      try {
        const matchedJobs = await aiMatchApi.getMatches(jobs);
        setJobsWithMatch(matchedJobs);
      } catch {
        setJobsWithMatch(jobs.map((job) => ({ ...job, matchPercent: 0 })));
      }
    };

    fetchMatches();
  }, [jobs]);

  return jobsWithMatch;
};
