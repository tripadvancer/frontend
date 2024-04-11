module.exports = function ({ addComponents, theme }) {
    const utilities = {
        '.container': {
            margin: '0 auto',
            width: '100%',
            paddingRight: theme('spacing.4'),
            paddingLeft: theme('spacing.4'),
            '@screen sm': {
                maxWidth: '1184px',
                paddingRight: theme('spacing.8'),
                paddingLeft: theme('spacing.8'),
            },
        },
        '.inner-container': {
            margin: '0 auto',
            width: '100%',
            '@screen sm': {
                maxWidth: '928px',
            },
        },
        '.flex-center': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        '.hover-animated': {
            transitionProperty: 'color, background-color',
            transitionDuration: '300ms',
            transitionTimingFunction: 'ease-in-out',
        },
    }

    addComponents(utilities)
}
