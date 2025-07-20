// lib/actions.js
"use server";

import { revalidatePath } from "next/cache";
import prisma from './prisma';
import { auth } from "@/auth"; 
import { createTaskSchema, updateTaskSchema } from "./schema";

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


	// --- New Server Action: Create Task ---
	export async function createTask(prevState, formData) {
	  const session = await auth();
	  const userId = session?.user?.id;
	  if (!userId) {
	    // Return an error object or redirect if not authenticated
	    return { success: false, message: "User not authenticated." };
	  }
	
	  const rawData = {
	    title: formData.get("title"),
	    description: formData.get("description"),
	    projectId: formData.get("projectId"),
	    // status and assignedToId will be handled later if needed in initial creation
	  };
	
	  try {
	    // Validate with Zod
	    const validatedData = createTaskSchema.parse(rawData);
	
	    // Check if projectId actually exists (more robust than just schema validation)
	    const project = await prisma.project.findUnique({
	      where: { id: validatedData.projectId }
	    });
	    if (!project) {
	      return { success: false, errors: { projectId: "Selected project does not exist." } };
	    }
	
	    const newTask = await prisma.task.create({
	      data: {
	        title: validatedData.title,
	        description: validatedData.description,
	        projectId: validatedData.projectId,
	        // Optionally set assignedToId to the creator by default
	        assignedToId: userId, // Assuming creator is also assignee
	        status: "Pending" // Default status
	      },
	    });
	
	    revalidatePath(`/dashboard/projects/${validatedData.projectId}`); // Revalidate specific project page
	    revalidatePath("/dashboard"); // Also revalidate general dashboard
	    return { success: true, task: newTask };
	  } catch (error) {
	    // Handle Zod validation errors
	    if (error instanceof Error && error.issues) { // ZodError has an 'issues' array
	      const fieldErrors = error.issues.reduce((acc, issue) => {
	        acc[issue.path[0]] = issue.message;
	        return acc;
	      }, {});
	      return { success: false, errors: fieldErrors };
	    }
	    // Handle other errors
	    return { success: false, message: error.message || "Failed to create task." };
	  }
	}
	
	// --- New Server Action: Update Task ---
	export async function updateTask(prevState, formData) {
	    const taskId = formData.get("id"); // Assuming ID is passed for update
	    if (!taskId) {
	        return { success: false, message: "Task ID is required for update." };
	    }
	
	    const rawData = {
	        title: formData.get("title"),
	        description: formData.get("description"),
	        status: formData.get("status"),
	        assignedToId: formData.get("assignedToId"),
	        // projectId cannot be changed here typically
	    };
	
	    try {
	        // Validate with Zod, allowing only fields present to be updated
	        const validatedData = updateTaskSchema.partial().parse(rawData); // .partial() makes all fields optional for update
	
	        const updatedTask = await prisma.task.update({
	            where: { id: taskId },
	            data: validatedData,
	        });
	
	        revalidatePath(`/dashboard/projects/${updatedTask.projectId}`); // Revalidate specific project page
	        revalidatePath("/dashboard"); // Revalidate general dashboard
	        return { success: true, task: updatedTask };
	    } catch (error) {
	        if (error instanceof Error && error.issues) {
	            const fieldErrors = error.issues.reduce((acc, issue) => {
	                acc[issue.path[0]] = issue.message;
	                return acc;
	            }, {});
	            return { success: false, errors: fieldErrors };
	        }
	        if (error.code === 'P2025') { // Prisma error code for record not found
	            return { success: false, message: "Task not found." };
	        }
	        return { success: false, message: error.message || "Failed to update task." };
	    }
	}