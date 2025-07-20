// lib/schemas.js
// const z = require('zod');
import { z } from 'zod';

// Schema for creating a new task
export const createTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(100, "Title cannot exceed 100 characters."),
  description: z.string().max(500, "Description cannot exceed 500 characters.").optional().or(z.literal('')), // Allow empty string for optional
  projectId: z.string().uuid("Invalid project ID. Please select a project."), // Assuming UUIDs for project IDs
});

// Schema for updating a task (all fields optional)
export const updateTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(100, "Title cannot exceed 100 characters.").optional(),
  description: z.string().max(500, "Description cannot exceed 500 characters.").optional().or(z.literal('')),
  status: z.enum(["Pending", "In Progress", "Completed"], {
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_enum_value) {
        return { message: "Status must be 'Pending', 'In Progress', or 'Completed'." };
      }
      return { message: ctx.defaultError };
    },
  }).optional(),
  assignedToId: z.string().uuid("Invalid assigned user ID.").optional().or(z.literal('')),
});