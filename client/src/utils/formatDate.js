/**
 * formatDate: Format date strings to readable format e.g. "Oct 14, 2025".
 */
export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
