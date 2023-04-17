/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["randomcontent.wpengine.com"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "cache-control",
            value: "s-maxage=60, stale-while-revalidate, stale-if-error",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
