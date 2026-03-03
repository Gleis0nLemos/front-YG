/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',       
      },
      {
        protocol: 'http',
        hostname: '**',       
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',         
      },
    ],
    unoptimized: true,
  },

  devIndicators:  false,
  output: 'standalone',
};

module.exports = nextConfig;