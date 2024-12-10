    // import type { NextConfig } from "next";

    // const nextConfig: NextConfig = {
    // /* config options here */
    // };

    // export default nextConfig;  
   
   import type { NextConfig } from 'next';
   const nextConfig: NextConfig = {
   reactStrictMode: true,
   images: {
   domains: [], 
   },
  
   webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
    },

   env: {
   NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://example.com/api",
   },

   i18n: {
   locales: ['en', 'es'],
   defaultLocale: 'en',
   },

   async redirects() {
   return [
   {
   source: '/old-route',
   destination: '/new-route',
   permanent: true,
   },
   ];
   },

   async rewrites() {
   return [
   {
   source: '/api/:path*',
   destination: 'https://example.com/api/:path*', 
   },
   ];
   },
   };

   export default nextConfig;
