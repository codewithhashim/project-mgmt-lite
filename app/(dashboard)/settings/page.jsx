// app/(dashboard)/settings/page.js
import PageHeader from "@/components/PageHeader";
import ProfilePictureUpload from "@/components/profile/ProfilePictureUpload"; // Import
import { auth } from "@/auth"; // To get current user session
import Image from "next/image"; // Import Next.js Image component

// Make this page dynamic to prevent caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SettingsPage() {
  const session = await auth(); // Get session
  const user = session?.user; // Get user object from session

  return (
    <div>
      <PageHeader
        title="Account Settings"
        description="Manage your profile information and preferences."
      />

      <div className="mt-8 space-y-8">
        {user && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              {user.image ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-200">
                  <Image 
                    src={`${user.image}?t=${new Date().getTime()}`} // Add timestamp to prevent caching
                    alt={user.name || "Profile"}
                    fill
                    sizes="96px"
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-gray-500">
                    {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            
            <ProfilePictureUpload currentImageUrl={user.image} />
          </div>
        )}

        {/* Other settings content */}
        <h3 className="text-xl font-semibold">General Information</h3>
        <p className="mt-4 text-gray-700">Name: {user?.name || "N/A"}</p>
        <p className="text-gray-700">Email: {user?.email || "N/A"}</p>
      </div>
    </div>
  );
}