/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // images: { unoptimized: true }
  rewrites: async () => [
    {
      source: '/history',
      destination: '/',
    },
  ],
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    BASE_URL: process.env.BASE_URL,
    OSM_CLIENT_ID: process.env.OSM_CLIENT_ID,
    OSM_CLIENT_SECRET: process.env.OSM_CLIENT_SECRET,
    SECRET: process.env.SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
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
      {
        protocol: 'https',
        hostname: 'weeklyosm.eu',
      },
      {
        protocol: 'https',
        hostname: '**.ibb.co',
      },
    ],
  },
}

module.exports = nextConfig
