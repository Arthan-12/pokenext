/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

// module.exports = {
//   images: {
//     formats: ['image/avif', 'image/webp'],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'raw.githubusercontent.com',
//         port: '',
//         pathname: '/PokeAPI/sprites/master/sprites/pokemon',
//       },
//     ],
//   },
// };
