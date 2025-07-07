// file: lib/data.js

// In a development environment, Node.js can reload this file, resetting our
// in-memory data. To prevent this, we store the data on the `global` object,
// which persists across reloads.

// Check if our projects array already exists on the global object. -
// If not, initialize it with the default data.
global.projects = global.projects || [
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

// Simulate a database call
export const getProjects = async () => {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  // Now we read from the global object
  return global.projects;
};

// Simulate a database write
export const addProject = (project) => {
  // And we write to the global object
  global.projects.push({ id: global.projects.length + 1, ...project });
  console.log("Current projects:", global.projects);
};