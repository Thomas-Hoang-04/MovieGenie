/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/movie",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
