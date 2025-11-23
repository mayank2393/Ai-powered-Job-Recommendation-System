/**
 * aiMatchApi: Placeholder API for AI job matching percentages.
 * In reality, this would call an AI/machine learning service.
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const aiMatchApi = {
  getMatches: async (jobs) => {
    await delay(300);
    // Fake AI match by assigning random percentage 60-100
    return jobs.map((job) => ({
      ...job,
      matchPercent: Math.floor(60 + Math.random() * 40),
    }));
  },
};
