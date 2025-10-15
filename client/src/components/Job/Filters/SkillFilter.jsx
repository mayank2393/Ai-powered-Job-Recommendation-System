import React from "react";

/**
 * SkillFilter component: Multi-select checkboxes for filtering jobs by skills.
 * Props: skills (string array), selectedSkills (array), onChange (function)
 */
const SkillFilter = ({ skills, selectedSkills, onChange }) => {
  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      onChange(selectedSkills.filter((s) => s !== skill));
    } else {
      onChange([...selectedSkills, skill]);
    }
  };

  return (
    <div className="mb-4">
      <p className="block text-sm font-medium text-gray-700 mb-1">Skills</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <label
            key={idx}
            className="flex items-center space-x-2 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={selectedSkills.includes(skill)}
              onChange={() => toggleSkill(skill)}
              className="form-checkbox text-indigo-600"
            />
            <span className="text-gray-700">{skill}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SkillFilter;
