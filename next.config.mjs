import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Only ignore during builds if you have a separate CI/CD linting step
    // For production, it's better to fix linting errors
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Only ignore during builds if you have a separate type checking step
    // For production, it's better to fix type errors
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  // Exclude better-sqlite3 from webpack bundling for serverless compatibility
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      // Mark better-sqlite3 as external to prevent bundling issues
      config.externals.push('better-sqlite3');
    }
    return config;
  },
}

export default withNextIntl(nextConfig);
