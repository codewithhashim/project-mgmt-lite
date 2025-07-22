// components/profile/ProfilePictureUpload.js
"use client"; // This component needs to be a Client Component

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image"; // Import Next.js Image component
import { useRouter } from "next/navigation"; // Import router for refreshing the page

export default function ProfilePictureUpload({ currentImageUrl }) {
  const router = useRouter(); // Initialize router
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || null);
  // No 'useToast()' here, as 'sonner' exports the 'toast' function directly

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]; // Get the selected file
    if (!file) {
      return; // No file selected
    }

    // Basic file type and size validation (client-side)
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (PNG, JPG, GIF)."); // <-- Sonner toast.error()
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5 MB limit
      toast.error("File size limit is 5MB."); // <-- Sonner toast.error()
      return;
    }

    // Create a preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    setIsUploading(true); // Set uploading state
    try {
      // Create form data for the file upload
      const formData = new FormData();
      formData.append("file", file);
      
      // Send the file to our server-side API
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to upload image");
      }

      if (result.success) {
        toast.success(result.message || "Profile picture updated successfully!"); // <-- Sonner toast.success()
        
        // Short delay to ensure the database update completes
        setTimeout(() => {
          // Force refresh the page to get the latest image
          router.refresh();
        }, 500);
      } else {
        throw new Error(result.error || "Failed to update profile picture");
      }
    } catch (error) {
      console.error("Error during file upload or database update:", error);
      toast.error(error.message || "An unexpected error occurred during upload."); // <-- Sonner toast.error()
      setPreviewUrl(currentImageUrl); // Reset preview to original
    } finally {
      setIsUploading(false); // Reset uploading state
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input field
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Update Profile Picture</h3>
      <div className="flex items-center space-x-4">
        <div>
          <Label htmlFor="profilePicture" className="cursor-pointer">
            <Button asChild disabled={isUploading}>
              <span>{isUploading ? "Uploading..." : "Change Picture"}</span>
            </Button>
          </Label>
          <Input
            id="profilePicture"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/gif"
            className="hidden"
            disabled={isUploading}
          />
          {isUploading && <p className="text-sm text-gray-500 mt-2">Processing upload...</p>}
        </div>
      </div>
    </div>
  );
}