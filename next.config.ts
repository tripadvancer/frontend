import { NextConfig } from 'next'
import withPWA from 'next-pwa'

const withPWANext = withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
})

const nextConfig: NextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    images: {
        unoptimized: true,
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imagedelivery.net',
                pathname: '/*/*/*',
            },
            {
                protocol: 'https',
                hostname: 'source.unsplash.com',
                pathname: '/256x256/**',
            },
            {
                protocol: 'https',
                hostname: 'source.unsplash.com',
                pathname: '/1920x1280/**',
            },
            {
                protocol: 'https',
                hostname: 'api.mapbox.com',
                pathname: '/styles/v1/mapbox/streets-v12/static/**',
            },
        ],
    },
}

export default withPWANext(nextConfig as any)
