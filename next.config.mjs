/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/img/*",
      },
      {
        protocol: "https",
        hostname: "groww.in",
        port: "",
        pathname: "/*",
      },
    ],
  },
};

export default nextConfig;
