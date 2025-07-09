// lib/actions.js
"use server";

import { revalidatePath } from "next/cache";
const prisma = require('./prisma'); // Import your prisma client

export async function createProject(formData) {
  const name = formData.get("name");
  const description = formData.get("description");

  // Basic validation (we'll do more robust validation in Week 3)
  if (!name) {
    throw new Error("Project name is required.");
  }

  // In a real scenario, you'd get the current user's ID from the session.
  // For now, let's link it to the first user we created in the seed.
  // This is a temporary hack until we implement Auth.js in Day 11-14.
  const existingUser = await prisma.user.findFirst();
  if (!existingUser) {
      throw new Error("No user found. Please run prisma db seed.");
  }

  await prisma.project.create({
    data: {
      name,
      description,
      creatorId: existingUser.id, // Link to the existing user
    },
  });

  // Revalidate the dashboard path to show the new project
  revalidatePath("/dashboard");
}