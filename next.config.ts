import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

import withMDX from '@next/mdx'

const withNextIntl = createNextIntlPlugin('./src/utils/i18n/i18n.config.ts')

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
}

export default withNextIntl(withMDX()(nextConfig))
