import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Obrázky: AVIF (nejmenší) → WebP fallback, dlouhá cache
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 rok
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600],
    imageSizes: [64, 128, 256, 384],
  },

  // Menší JS bundle: cílený tree-shaking framer-motion
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },

  // V produkci odstranit console.* (kromě error/warn)
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  poweredByHeader: false,
};

export default nextConfig;
