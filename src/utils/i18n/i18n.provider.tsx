'use client'

import { I18nProviderClient } from '@/utils/i18n/i18n.client'

export function I18nProvider({ children, locale }: { children: React.ReactNode; locale: string }) {
    return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
}
