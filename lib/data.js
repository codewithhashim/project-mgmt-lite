const projects = [
  {
    id: 1,
    name: "Launch New Website",
    description: "Complete the final design and development for the new marketing site.",
  },
  {
    id: 2,
    name: "Q3 Marketing Campaign",
    description: "Plan and execute the marketing campaign for the third quarter.",
  },
  {
    id: 3,
    name: "Mobile App Refactor",
    description: "Refactor the legacy codebase for the iOS and Android apps.",
  },
];

export const getProjects = async () => {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return projects;
};

// Simulate a database write
export const addProject = (project) => {
  projects.push({ id: projects.length + 1, ...project });
  console.log("Current projects:", projects);
};