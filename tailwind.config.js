/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        screens: {
            phone: { max: '768px' },
            // => @media (max-width: 768px) { ... }

            tablet: { min: '769px', max: '1023px' },
            // => @media (min-width: 769px) and (max-width: 1023px) { ... }

            desktop: { min: '1120px' },
            // => @media (min-width: 1120px) { ... }
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '2rem',
            },
            screens: {
                phone: '100%',
                tablet: '100%',
                desktop: '1120px',
            },
        },
        extend: {
            borderRadius: {
                '4xl': '2rem',
            },
            colors: {
                'custom-blue': {
                    100: '#1890ff',
                    80: '#46a6ff',
                    20: '#d1e9ff',
                    10: '#e8f4ff',
                    active: '#1373cc',
                },
                'custom-orange': {
                    100: '#ff7d00',
                    80: '#ff9733',
                    20: '#ffe5cc',
                    10: '#fff2e6',
                    active: '#d96c04',
                },
                'custom-red': {
                    100: '#f6511d',
                    10: '#fee5dd',
                },
                'custom-green': {
                    100: '#98ce00',
                    10: '#f0f8d9',
                },
                'custom-yellow': {
                    100: '#efca08',
                    10: '#fdf7da',
                },
                'custom-black': {
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
