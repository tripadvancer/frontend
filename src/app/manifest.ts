import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: '/',
        name: 'Tripadvancer',
        short_name: 'Tripadvancer',
        description: 'Discovering, sharing, and remembering amazing places.',

        start_url: '/maps',
        scope: '/',

        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone', 'fullscreen'],
        orientation: 'portrait',

        background_color: '#fff',
        theme_color: '#fff',

        categories: ['travel', 'social', 'maps'],

        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/icons/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icons/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/icons/icon-512-maskable.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],

        protocol_handlers: [
            {
                protocol: 'web+tripadvancer',
                url: '/?link=%s',
            },
        ],
    }
}
