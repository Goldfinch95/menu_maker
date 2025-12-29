import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // @ts-expect-error - serverActions existe pero no está en los tipos
  serverActions: {
    bodySizeLimit: '5mb',
  },
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  }, 
};

module.exports = nextConfig;