// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/demo/image/upload/**", // Cloudinary URL'nizin yolunu buraya ekleyin
      },
    ],
  },
};

module.exports = nextConfig;
