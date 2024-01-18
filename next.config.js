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
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "**",
      },
    ],
  },
  swcMinify: false,
};

// module.exports = nextConfig;

const withVideos = require("next-videos");

module.exports = withVideos(nextConfig);
