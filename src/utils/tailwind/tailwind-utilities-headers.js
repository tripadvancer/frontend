module.exports = function ({ addComponents, theme }) {
    const utilities = {
        '.h1': {
            fontSize: '2.75rem',
            lineHeight: '3.25rem',
            fontWeight: '500',
            '@screen sm': {
                fontSize: '3rem',
                lineHeight: '3.5rem',
            },
        },
        '.h2': {
            fontSize: '2.25rem',
            lineHeight: '2.75rem',
            fontWeight: '500',
            '@screen sm': {
                fontSize: '2.5rem',
                lineHeight: '3rem',
            },
        },
        '.h3': {
            fontSize: '1.75rem',
            lineHeight: '2.25rem',
            fontWeight: '500',
            '@screen sm': {
                fontSize: '2rem',
                lineHeight: '2.5rem',
            },
        },
        '.h4': {
            fontSize: '1.5rem',
            lineHeight: '2rem',
            fontWeight: '500',
            '@screen sm': {
                fontSize: '1.75rem',
                lineHeight: '2.25rem',
            },
        },
        '.h5': {
            fontSize: '1.25rem',
            lineHeight: '1.75rem',
            fontWeight: '500',
            '@screen sm': {
                fontSize: '1.5rem',
                lineHeight: '2rem',
            },
        },
        '.h6': {
            fontSize: '1.125rem',
            lineHeight: '1.625rem',
            fontWeight: '500',
            '@screen sm': {
                fontSize: '1.25rem',
                lineHeight: '1.75rem',
            },
        },
        '.h7': {
            fontSize: '1rem',
            lineHeight: '1.5rem',
            fontWeight: '500',
            '@screen sm': {
                fontSize: '1.125rem',
                lineHeight: '1.625rem',
            },
        },
    }

    addComponents(utilities)
}
