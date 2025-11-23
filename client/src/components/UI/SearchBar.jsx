import React from "react";

/**
 * SearchBar component: Search input with icon.
 * Props: onSearch (callback), placeholder, value, onChange
 */
const SearchBar = ({ onSearch, placeholder = "Search...", value, onChange }) => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
      <svg
        className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  );
};

export default SearchBar;
