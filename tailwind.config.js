const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
        container: false,
    },
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontSize: {
                big: [
                    '1rem',
                    {
                        lineHeight: '1.5rem',
                    },
                ],
                'big-bold': [
                    '1rem',
                    {
                        lineHeight: '1.5rem',
                        fontWeight: '500',
                    },
                ],
                base: [
                    '0.875rem',
                    {
                        lineHeight: '1.25rem',
                    },
                ],
                small: [
                    '0.75rem',
                    {
                        lineHeight: '1rem',
                    },
                ],
                'small-bold': [
                    '0.75rem',
                    {
                        lineHeight: '1rem',
                        fontWeight: '500',
                    },
                ],
                caps: [
                    '0.875rem',
                    {
                        lineHeight: '1.25rem',
                    },
                ],
            },
            boxShadow: {
                large: '0 8px 16px rgba(2, 14, 25, .32)',
                medium: '0 16px 32px rgba(2, 14, 25, 0.16)',
                small: '0 8px 16px rgba(2, 14, 25, 0.08)',
                black: '0 4px 8px rgba(78, 87, 94, 0.32)',
                red: '0 0 16px rgba(197, 68, 28, 1)',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            width: {
                104: '26rem',
            },
            colors: {
                blue: {
                    100: '#1890ff',
                    80: '#46a6ff',
                    20: '#d1e9ff',
                    10: '#e8f4ff',
                    active: '#1373cc',
                },
                orange: {
                    100: '#ff7d00',
                    80: '#ff9733',
                    20: '#ffe5cc',
                    10: '#fff2e6',
                    active: '#d96c04',
                },
                red: {
                    100: '#f6511d',
                    20: '#fddcd2',
                    10: '#fee5dd',
                    active: '#c5441c',
                },
                green: {
                    100: '#98ce00',
                    10: '#f0f8d9',
                },
                yellow: {
                    100: '#efca08',
                    10: '#fdf7da',
                },
                black: {
                    100: '#020e19',
                    70: '#4e575e',
                    40: '#9a9fa3',
                    15: '#d9dbdd',
                    5: '#f2f3f3',
                },
            },
        },
    },
    plugins: [
        require('./src/utils/tailwind/tailwind-custom-links.js'),
        require('./src/utils/tailwind/tailwind-plugin-markdown.js'),
        require('./src/utils/tailwind/tailwind-utilities-headers.js'),
        require('./src/utils/tailwind/tailwind-utilities-scrollbar.js'),
        require('./src/utils/tailwind/tailwind-utilities.js'),
    ],
}
