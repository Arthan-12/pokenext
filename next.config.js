/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
};

// const intercept = require('intercept-stdout');

// // safely ignore recoil stdout warning messages
// function interceptStdout(text) {
//   if (text.includes('Duplicate atom key')) {
//     return '';
//   }
//   return text;
// }

// // Intercept in dev and prod
// intercept(interceptStdout);

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
