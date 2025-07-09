
// lib/data.js
const prisma = require('./prisma'); // Import your prisma client

export const getProjects = async () => {
  // No need for setTimeout simulation anymore, we're hitting a real DB!
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }, // Order by creation date, newest first
  });
  return projects;
};
