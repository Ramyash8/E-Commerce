/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.fynd.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.thewirecutter.com',
      },
      {
        protocol: 'https',
        hostname: 'images.meesho.com',
      },
      {
        protocol: 'https',
        hostname: 'jivisa.in',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images-static.nykaa.com',
      },
      {
        protocol: 'https' ,
        hostname: 'placehold.co',
      },
       {
        protocol: 'https',
        hostname: 'www.beyours.in',
      },
    ],
  },
};

export default nextConfig;
