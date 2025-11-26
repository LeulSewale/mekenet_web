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
}

export default withNextIntl(nextConfig);
