import { Config } from 'next-i18n-router/dist/types'

const i18nConfig: Config = {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    prefixDefault: false,
    routingStrategy: 'rewrite',
}

export default i18nConfig
