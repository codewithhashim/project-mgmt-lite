// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional, useful for clean re-seeding)
  await prisma.task.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.user.deleteMany({});

  // Create a user
  const user = await prisma.user.create({
    data: {
      name: "Hashim Developer",
      email: "hashim.dev@example.com",
    },
  });

  // Create projects linked to the user
  const project1 = await prisma.project.create({
    data: {
      name: "Project Management Lite App",
      description: "Build the core features of the P-M Lite tool.",
      creatorId: user.id, // Link to the user
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: "Marketing Campaign Q3",
      description: "Plan and execute digital marketing efforts for Q3.",
      creatorId: user.id, // Link to the user
    },
  });

  console.log('Seed data created:');
  console.log({ user, project1, project2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });