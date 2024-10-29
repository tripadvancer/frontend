import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

import withMDX from '@next/mdx'

const withNextIntl = createNextIntlPlugin('./src/utils/i18n/i18n.config.ts')

const configureSVGHandling = (config: any) => {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: { test: { test: (arg0: string) => any } }) =>
        rule.test?.test?.('.svg'),
    )

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
}

const nextConfig: NextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    images: {
        unoptimized: true,
        formats: ['image/avif', 'image/webp'],
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
    webpack: configureSVGHandling,
}

export default withNextIntl(withMDX()(nextConfig))
