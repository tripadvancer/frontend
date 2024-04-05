module.exports = function ({ addComponents, theme }) {
    const markdown = {
        '.markdown': {
            article: {
                '&:not(:last-child)': {
                    marginBottom: theme('spacing.16'),
                },
            },
            h1: {
                '@apply h1': '',
                textAlign: 'center',
                marginBottom: theme('spacing.16'),
            },
            h2: {
                '@apply h2': '',
            },
            h3: {
                '@apply h3': '',
            },
            h4: {
                '@apply h4': '',
            },
            h5: {
                '@apply h5': '',
                marginBottom: theme('spacing.8'),
            },
            h6: {
                '@apply h6': '',
            },
            h7: {
                '@apply h7': '',
            },
            p: {
                '&:not(:last-child)': {
                    marginBottom: theme('spacing.5'),
                },
            },
            ol: {
                listPosition: 'outside',
                listStyleType: 'decimal',
                paddingLeft: theme('spacing.4'),
                '@screen sm': {
                    paddingLeft: theme('spacing.12'),
                },
                '& li:not(:last-child)': {
                    marginBottom: theme('spacing.3'),
                },
            },
        },
    }

    addComponents(markdown)
}
