import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  // Add rewrites for Clerk's SSO callback
  async rewrites() {
    return [
      {
        source: '/sso-callback',
        destination: '/sign-in',
      },
      {
        source: '/sign-in/sso-callback',
        destination: '/sign-in',
      },
    ];
  },
};

export default nextConfig;