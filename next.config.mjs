/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    trailingSlash: true, // This one go make Vercel understand your routing
};

module.exports = nextConfig;
