/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['en', 'ru'],
        defaultLocale: 'en',
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imagedelivery.net',
                port: '',
                pathname: '/*/*/*',
            },
        ],
    },
}

module.exports = nextConfig
