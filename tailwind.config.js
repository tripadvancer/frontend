/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
        container: false,
    },
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontSize: {
                h1: [
                    '3rem',
                    {
                        lineHeight: '3.5rem',
                        fontWeight: '500',
                    },
                ],
                'h1-m': [
                    '2.75rem',
                    {
                        lineHeight: '3.25rem',
                        fontWeight: '500',
                    },
                ],
                h2: [
                    '2.5rem',
                    {
                        lineHeight: '3rem',
                        fontWeight: '500',
                    },
                ],
                'h2-m': [
                    '2.25rem',
                    {
                        lineHeight: '2.75rem',
                        fontWeight: '500',
                    },
                ],
                h3: [
                    '2rem',
                    {
                        lineHeight: '2.5rem',
                        fontWeight: '500',
                    },
                ],
                'h3-m': [
                    '1.75rem',
                    {
                        lineHeight: '2.25rem',
                        fontWeight: '500',
                    },
                ],
                h4: [
                    '1.75rem',
                    {
                        lineHeight: '2.25rem',
                        fontWeight: '500',
                    },
                ],
                'h4-m': [
                    '1.5rem',
                    {
                        lineHeight: '2rem',
                        fontWeight: '500',
                    },
                ],
                h5: [
                    '1.5rem',
                    {
                        lineHeight: '2rem',
                        fontWeight: '500',
                    },
                ],
                'h5-m': [
                    '1.25rem',
                    {
                        lineHeight: '1.75rem',
                        fontWeight: '500',
                    },
                ],
                h6: [
                    '1.25rem',
                    {
                        lineHeight: '1.75rem',
                        fontWeight: '500',
                    },
                ],
                'h6-m': [
                    '1.125rem',
                    {
                        lineHeight: '1.625rem',
                        fontWeight: '500',
                    },
                ],
                h7: [
                    '1.125rem',
                    {
                        lineHeight: '1.625rem',
                        fontWeight: '500',
                    },
                ],
                'h7-m': [
                    '1rem',
                    {
                        lineHeight: '1.5rem',
                        fontWeight: '500',
                    },
                ],
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
                'base-bold': [
                    '0.875rem',
                    {
                        lineHeight: '1.25rem',
                        fontWeight: '500',
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
                medium: '0 16px 32px rgba(2, 14, 25, 0.16)',
                small: '0 8px 16px rgba(2, 14, 25, 0.08)',
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
                    10: '#fee5dd',
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
    plugins: [],
}
