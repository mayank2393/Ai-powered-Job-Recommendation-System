import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import JobCard from "../components/Job/JobCard";
import LocationFilter from "../components/Job/Filters/LocationFilter";
import SkillFilter from "../components/Job/Filters/SkillFilter";
import SalaryFilter from "../components/Job/Filters/SalaryFilter";
import Pagination from "../components/UI/Pagination";
import { useFetchJobs } from "../hooks/useFetchJobs";

/**
 * JobList page: Lists jobs with filters and pagination.
 * Supports filtering by location, skill, and salary.
 */
const JobList = () => {
  const { jobs, loading, error, fetchJobs } = useFetchJobs();
  const [searchParams] = useSearchParams();

  // Filters state
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState([]);
  const [salary, setSalary] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  // Extract search query param
  const searchQuery = searchParams.get("search") || "";

  // Fetch jobs on load
  useEffect(() => {
    fetchJobs();
  }, []);

  // Update filters and reset page after filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [location, skills, salary, searchQuery]);

  // Filter the jobs according to filters & search
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = location ? job.location === location : true;
    const matchesSkills =
      skills.length === 0 || skills.every((s) => job.skills.includes(s));
    const matchesSalary = salary ? job.salary >= salary : true;

    return matchesSearch && matchesLocation && matchesSkills && matchesSalary;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  // Unique locations and skills for filters
  const uniqueLocations = Array.from(new Set(jobs.map((j) => j.location)));
  const uniqueSkills = Array.from(
    new Set(jobs.flatMap((j) => j.skills))
  );

  // Salary range
  const minSalary = Math.min(...jobs.map((j) => j.salary));
  const maxSalary = Math.max(...jobs.map((j) => j.salary));

  return (
    <main className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <aside className="w-full md:w-64 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">Filters</h2>
          <LocationFilter
            locations={uniqueLocations}
            selectedLocation={location}
            onChange={setLocation}
          />
          <SkillFilter
            skills={uniqueSkills}
            selectedSkills={skills}
            onChange={setSkills}
          />
          <SalaryFilter
            minSalary={minSalary}
            maxSalary={maxSalary}
            selectedSalary={salary}
            onChange={setSalary}
          />
          <button
            onClick={() => {
              setLocation("");
              setSkills([]);
              setSalary(0);
            }}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Clear Filters
          </button>
        </aside>

        {/* Job cards list */}
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && <p>Loading jobs...</p>}
          {error && <p className="text-red-600">Failed to load jobs.</p>}

          {!loading && !error && paginatedJobs.length === 0 && (
            <p className="text-gray-600 col-span-full">No jobs found.</p>
          )}

          {!loading && !error && paginatedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </section>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </main>
  );
};

export default JobList;
