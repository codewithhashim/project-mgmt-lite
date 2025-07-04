// file: lib/actions.js
"use server"; // This directive marks all functions in this file as Server Actions

import { revalidatePath } from "next/cache";
import { addProject } from "./data";

export async function createProject(formData) {
  // Get the raw data from the form
  const project = {
    name: formData.get("name"),
    description: formData.get("description"),
  };

  // Add it to our "database"
  addProject(project);

  // Revalidate the dashboard path.
  // This tells Next.js to re-fetch the data on the dashboard page,
  // so the new project appears instantly.
  revalidatePath("/dashboard");
}

