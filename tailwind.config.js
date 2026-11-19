/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
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
        },
    },
}
