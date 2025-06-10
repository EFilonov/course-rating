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
};


export default withBundleAnalyzer(nextConfig);


