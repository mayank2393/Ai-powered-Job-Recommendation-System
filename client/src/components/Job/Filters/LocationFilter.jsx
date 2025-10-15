import React from "react";

/**
 * LocationFilter component: Dropdown for filtering jobs by location.
 * Props: locations (string array), selectedLocation, onChange
 */
const LocationFilter = ({ locations, selectedLocation, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="location-filter">
        Location
      </label>
      <select
        id="location-filter"
        value={selectedLocation}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All Locations</option>
        {locations.map((loc, idx) => (
          <option key={idx} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationFilter;
