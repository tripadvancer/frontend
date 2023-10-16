/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        screens: {
            phone: { max: '768px' },
            tablet: { min: '769px', max: '1023px' },
            desktop: { min: '1024px' },
        },
        container: {
            center: true,
            screens: {
                phone: '100%',
                tablet: '100%',
                desktop: '1184px',
            },
        },
        extend: {
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
