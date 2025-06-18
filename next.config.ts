import type { NextConfig } from 'next';

import initializeBundleAnalyzer from '@next/bundle-analyzer';


const withBundleAnalyzer = initializeBundleAnalyzer({
    enabled: process.env.BUNDLE_ANALYZER_ENABLED === 'true'
});


// const nextConfig: NextConfig = {
//     output: 'standalone',
//     turbopack: {
//         rules: {
//             '*.svg': {
//                 loaders: ['@svgr/webpack'],
//                 as: '*.js',
//             },
//         },
//     },
// };

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        as: '*.js',
        loaders: ['@svgr/webpack'],
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // allowedDevOrigins: [
  //   'http://localhost:3000',
  //   'http://192.168.1.25:3000',
  //   'local-origin.dev', '*.local-origin.dev' // твой IP и порт
  // ],
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    remotePatterns: [
    {
      protocol: 'https',
      hostname: 'old-images.hb.ru-msk.vkcs.cloud',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'coursus.ru',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'courses-top.ru',
      pathname: '/**',
    },
    {
      protocol: 'http',
      hostname: 'localhost',
      pathname: '/**',
    },
  ],
  },
  
};

export default withBundleAnalyzer(nextConfig);


