import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'i.ibb.co.com' },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },

  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: process.env.NEXT_PUBLIC_API_BASE_URL + "/api/auth/:path*",
      },
      {
        source: "/api/v1/:path*",
        destination: process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1/:path*",
      },
    ];
  },

};

export default nextConfig;