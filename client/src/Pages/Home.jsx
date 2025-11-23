import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/UI/SearchBar";

/**
 * Home page: Welcome page with search bar linked to job list.
 */
const Home = () => {
  const [query, setQuery] = React.useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <main className="container mx-auto p-6">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-indigo-700">Find Your Dream Job</h1>
        <p className="text-gray-700 mb-8 max-w-xl mx-auto">
          Discover thousands of job opportunities powered by AI match recommendations.
        </p>
        <SearchBar value={query} onChange={handleSearchChange} placeholder="Search jobs by title, skill, or location" />
        <Link
          to={`/jobs?search=${encodeURIComponent(query)}`}
          className="inline-block mt-4 bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 font-semibold"
        >
          Search Jobs
        </Link>
      </section>
    </main>
  );
};

export default Home;
