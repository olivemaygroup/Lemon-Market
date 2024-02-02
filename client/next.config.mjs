/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dsvnavnxo/image/upload/lo**',
      },
    ],
  },
 
};

export default nextConfig;


