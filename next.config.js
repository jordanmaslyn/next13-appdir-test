/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["randomcontent.wpengine.com"],
  },
};

module.exports = nextConfig;
