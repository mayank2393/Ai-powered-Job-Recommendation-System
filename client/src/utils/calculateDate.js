/**
 * calculateMatch: Placeholder helper to compute AI match percentage.
 * For demo, returns a random integer 50-100.
 */
export const calculateMatch = (job, userSkills = []) => {
  if (!userSkills.length) return 50;
  const matchRatio =
    job.skills.filter((skill) => userSkills.includes(skill)).length /
    job.skills.length;
  return Math.round(50 + matchRatio * 50);
};
