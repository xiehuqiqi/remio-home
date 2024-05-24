/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:08:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-24 11:44:27
 * @Description:
 */
/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa';

const isProd = process.env.NODE_ENV === 'production';

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: !isProd,
});

const nextConfig = {
  output: 'standalone',
  compiler: {
    removeConsole: isProd,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.staticaly.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "pixiv.re",
      },
      {
        protocol: "https",
        hostname: "kasuie.cc",
      },
    ]
  },
  async rewrites() {
    const ret = [
      {
        source: '/hapi/:path*',
        destination: 'https://v1.hitokoto.cn/:path*',
      },
    ];
    return {
      beforeFiles: ret,
    };
  },
};

export default withPWA(nextConfig);
