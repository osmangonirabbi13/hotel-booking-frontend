import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'example.com' },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", 
    },
  },
};

export default nextConfig;