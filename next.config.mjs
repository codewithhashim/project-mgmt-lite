/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'sfj3dxwbfus6jukg.public.blob.vercel-storage.com', // Vercel Blob storage
      'avatars.githubusercontent.com', // GitHub profile pictures
      'github.com',
      'lh3.googleusercontent.com', // Google profile pictures
      'googleusercontent.com'
    ]
  }
};

export default nextConfig;
