/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        screens: {
            phone: { max: '768px' },
            // => @media (max-width: 768px) { ... }

            tablet: { min: '769px', max: '1023px' },
            // => @media (min-width: 769px) and (max-width: 1023px) { ... }

            desktop: { min: '1024px' },
            // => @media (min-width: 1024px) { ... }
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '2rem',
            },
            screens: {
                phone: '100%',
                tablet: '100%',
                desktop: '992px',
            },
        },
        extend: {
            colors: {
                'custom-blue-100': '#1890ff',
                'custom-blue-80': '#46a6ff',
                'custom-blue-20': '#d1e9ff',
                'custom-blue-10': '#e8f4ff',
                'custom-blue-active': '#1373cc',
                'custom-orange-100': '#ff7d00',
                'custom-orange-80': '#ff9733',
                'custom-orange-20': '#ffe5cc',
                'custom-orange-10': '#fff2e6',
                'custom-orange-active': '#d96c04',
                'custom-red-100': '#f6511d',
                'custom-red-10': '#fee5dd',
                'custom-green-100': '#98ce00',
                'custom-green-10': '#f0f8d9',
                'custom-yellow-100': '#efca08',
                'custom-yellow-10': '#fdf7da',
                'custom-black-100': '#020e19',
                'custom-black-70': '#4e575e',
                'custom-black-40': '#9a9fa3',
                'custom-black-15': '#d9dbdd',
                'custom-black-5': '#f2f3f3',
            },
        },
    },
    plugins: [],
}
