/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.nasa.gov", "climate.nasa.gov"],
  },
};

export default nextConfig;

