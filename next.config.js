/** @type {import('next').NextConfig} */
const nextConfig = {
    // Custom page extensions supported by the project
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

    webpack(config) {
        // Find the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'))

        // Update the rules to handle SVG imports correctly
        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            },
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },

    // Image optimization settings
    images: {
        unoptimized: true, // Disable Next.js's built-in image optimization
        formats: ['image/avif', 'image/webp'], // Supported image formats
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imagedelivery.net',
                port: '',
                pathname: '/*/*/*',
            },
            {
                protocol: 'https',
                hostname: 'source.unsplash.com',
                port: '',
                pathname: '/256x256/**',
            },
            {
                protocol: 'https',
                hostname: 'source.unsplash.com',
                port: '',
                pathname: '/1920x1280/**',
            },
            {
                protocol: 'https',
                hostname: 'api.mapbox.com',
                port: '',
                pathname: '/styles/v1/mapbox/streets-v12/static/**',
            },
        ],
    },
}

// Plugins
const createNextIntlPlugin = require('next-intl/plugin')
const withMDX = require('@next/mdx')()

const withNextIntl = createNextIntlPlugin()

// Export the combined configuration
module.exports = withNextIntl(withMDX(nextConfig))
