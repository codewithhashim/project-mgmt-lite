// lib/actions.js
"use server";

import { revalidatePath } from "next/cache";
const prisma = require('./prisma');
import { auth } from "@/auth"; // Import auth for server-side session access

export async function createProject(formData) {
  const name = formData.get("name");
  const description = formData.get("description");

  // Basic validation
  if (!name) {
    throw new Error("Project name is required.");
  }

  const session = await auth(); // Get the current session
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not authenticated."); // Or handle redirection
  }

  await prisma.project.create({
    data: {
      name,
      description,
      creatorId: userId, // Link to the authenticated user's ID
    },
  });

  revalidatePath("/dashboard");
}