'use client'

import { i18nConfig } from '@/configs/i18n.config'
import { I18nProviderClient } from '@/utils/i18n.client'

export function I18nProvider({ children }: { children: React.ReactNode }) {
    return <I18nProviderClient fallback={<div>Loading locale ...</div>}>{children}</I18nProviderClient>
}
