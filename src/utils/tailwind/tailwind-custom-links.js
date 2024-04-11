module.exports = function ({ addComponents, theme }) {
    const links = {
        '.link': {
            color: theme('colors.blue.100'),
            cursor: 'pointer',
            '@apply hover-animated': '',
            '&:hover': {
                color: theme('colors.blue.active'),
            },
        },
        '.link-red': {
            color: theme('colors.red.100'),
            cursor: 'pointer',
            '@apply hover-animated': '',
            '&:hover': {
                color: theme('colors.red.active'),
            },
        },
        '.link-orange': {
            color: theme('colors.orange.100'),
            cursor: 'pointer',
            '@apply hover-animated': '',
            '&:hover': {
                color: theme('colors.orange.active'),
            },
        },
        '.link-white': {
            color: theme('colors.white'),
            cursor: 'pointer',
            '@apply hover-animated': '',
            '&:hover': {
                color: theme('colors.blue.active'),
            },
        },
        '.link-black': {
            color: theme('colors.black.100'),
            cursor: 'pointer',
            '@apply hover-animated': '',
            '&:hover': {
                color: theme('colors.blue.active'),
            },
        },
    }

    addComponents(links)
}
