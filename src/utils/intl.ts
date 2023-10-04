'server-only'

import { createIntl } from '@formatjs/intl'
import { currentLocale } from 'next-i18n-router'

import i18nConfig from '@/configs/i18n.config'

export default async function getIntl(namespace: string) {
    const locale = currentLocale() ?? i18nConfig.defaultLocale

    return createIntl({
        locale: locale,
        messages: (await import(`/messages/${locale}/${namespace}.json`)).default,
    })
}
