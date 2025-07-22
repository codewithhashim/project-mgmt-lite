// lib/fileActions.js
"use server"; // Marks all functions in this file as Server Actions

import { revalidatePath } from "next/cache"; // To update UI after user profile change
import prisma from "@/lib/prisma"; // Your Prisma client
import { auth } from "@/auth"; // To get the authenticated user's ID

/**
 * Server Action to update the authenticated user's profile image URL in the database.
 * This is called by the client *after* a file has been directly uploaded to Vercel Blob.
 * @param {string} fileUrl - The public URL of the uploaded file from Vercel Blob.
 * @returns {{ success: boolean, message?: string }}
 */
export async function updateUserProfileImage(fileUrl) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: "User not authenticated." };
  }

  if (!fileUrl) {
    return { success: false, message: "File URL is missing." };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { image: fileUrl },
    });

    // Revalidate paths that display user profile information
    revalidatePath("/dashboard"); // For dashboard potentially showing profile pic
    revalidatePath("/settings"); // For the settings page itself

    return { success: true, message: "Profile image updated successfully." };
  } catch (error) {
    console.error("Failed to update user profile image in DB:", error);
    return { success: false, message: "Failed to update profile image in database." };
  }
}