/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "**",
      },
    ],
  },
  swcMinify: false,
};

module.exports = nextConfig;
