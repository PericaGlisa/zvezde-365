/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Add server components external packages configuration
  experimental: {
    serverComponentsExternalPackages: ['resend']
  },
  // Disable SWC minification to avoid potential build issues
  swcMinify: false,
  // Optimize performance
  webpack: (config, { isServer, dev }) => {
    if (dev) {
      // Completely disable webpack caching in development mode
      config.cache = false;
    }
    
    // Removed the custom optimization configuration that was causing the error
    
    return config;
  },
  // Reduce filesystem operations
  onDemandEntries: {
    // Keep entries in memory, lower filesystem operations
    maxInactiveAge: 60 * 60 * 1000, // 1 hour
    pagesBufferLength: 5,
  },
  poweredByHeader: false,
  reactStrictMode: false // Disable strict mode to reduce double rendering
};

module.exports = nextConfig;