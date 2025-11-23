import React from "react";

/**
 * SalaryFilter component: Slider input for filtering jobs by minimum salary.
 * Props: minSalary, maxSalary, selectedSalary, onChange
 */
const SalaryFilter = ({ minSalary, maxSalary, selectedSalary, onChange }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="salary-filter"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Minimum Salary: ₹{selectedSalary?.toLocaleString() || "0"}
      </label>
      <input
        id="salary-filter"
        type="range"
        min={minSalary}
        max={maxSalary}
        value={selectedSalary || minSalary}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>₹{minSalary.toLocaleString()}</span>
        <span>₹{maxSalary.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default SalaryFilter;
