/**
 * jobsApi: Placeholder API calls for job data.
 * Replace with real backend REST API calls.
 */
const sampleJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions Ltd.",
    location: "Bangalore",
    salary: 1200000,
    description:
      "We are looking for a skilled frontend developer with React experience.",
    skills: ["React", "JavaScript", "CSS"],
    jobType: "Full-time",
    experience: "2+ years",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Innovatech",
    location: "Mumbai",
    salary: 1500000,
    description:
      "Seeking backend engineer experienced in Node.js and databases.",
    skills: ["Node.js", "MongoDB", "Express"],
    jobType: "Full-time",
    experience: "3+ years",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Data Minds",
    location: "Hyderabad",
    salary: 1800000,
    description: "Looking for a data scientist with machine learning skills.",
    skills: ["Python", "Machine Learning", "Statistics"],
    jobType: "Full-time",
    experience: "4+ years",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Creative Corp",
    location: "Delhi",
    salary: 900000,
    description: "Designer experienced in user interface and user experience.",
    skills: ["Figma", "Sketch", "Adobe XD"],
    jobType: "Contract",
    experience: "2+ years",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudWave",
    location: "Bangalore",
    salary: 1600000,
    description: "DevOps position requiring AWS and Docker experience.",
    skills: ["AWS", "Docker", "Kubernetes"],
    jobType: "Full-time",
    experience: "3+ years",
  },
  {
    id: 6,
    title: "Marketing Specialist",
    company: "SalesPro",
    location: "Chennai",
    salary: 800000,
    description:
      "Join our marketing team to drive campaigns and boost sales.",
    skills: ["SEO", "Content Marketing", "Google Analytics"],
    jobType: "Full-time",
    experience: "1+ years",
  },
];

/**
 * Simulate network delay in API calls.
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const jobsApi = {
  getJobs: async () => {
    await delay(500); // simulate network latency
    // Add dummy AI matchPercent between 50-100
    return sampleJobs.map((job) => ({
      ...job,
      matchPercent: Math.floor(50 + Math.random() * 50),
    }));
  },
  getJobById: async (id) => {
    await delay(300);
    const job = sampleJobs.find((job) => job.id === id);
    if (!job) throw new Error("Job not found");
    return { ...job, matchPercent: Math.floor(50 + Math.random() * 50) };
  },
};
