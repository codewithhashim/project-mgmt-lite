// app/api/upload-image/route.js
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { put } from "@vercel/blob";
import { updateUserProfileImage } from "@/lib/fileActions";

export async function POST(request) {
  // Check authentication
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get the form data with the file
    const formData = await request.formData();
    const file = formData.get("file");
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size limit is 5MB" }, { status: 400 });
    }

    // Generate a unique filename with timestamp
    const timestamp = new Date().getTime();
    const uniqueFilename = `${timestamp}-${file.name}`;

    // Upload to Vercel Blob (server-side)
    const blob = await put(uniqueFilename, file, {
      access: "public",
      addRandomSuffix: true // Use this instead of allowOverwrite to avoid CORS issues
    });

    // Update user profile with the new image URL
    const result = await updateUserProfileImage(blob.url);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      url: blob.url,
      message: "Profile picture updated successfully" 
    });
    
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
} 