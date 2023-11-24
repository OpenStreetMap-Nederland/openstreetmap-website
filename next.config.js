/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // images: { unoptimized: true }
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.openstreetmap.org',
      },
      {
        protocol: 'https',
        hostname: '**.gravatar.com',
      },
    ],
  },
}

module.exports = nextConfig
