'use client'

import { useChangeLocale, useCurrentLocale } from '@/utils/i18n.client'

export const LanguageChanger = () => {
    const changeLocale = useChangeLocale()
    const currentLocale = useCurrentLocale()

    const handleChangeLocale = (locale: 'en' | 'ru') => {
        if (currentLocale !== locale) {
            changeLocale(locale)
        }
    }

    return (
        <div className="flex gap-2">
            Current locale: {currentLocale}
            <div
                onClick={() => handleChangeLocale('en')}
                className="cursor-pointer text-custom-blue-100 hover:text-custom-blue-active"
            >
                En
            </div>
            <div
                onClick={() => handleChangeLocale('ru')}
                className="cursor-pointer text-custom-blue-100 hover:text-custom-blue-active"
            >
                Ru
            </div>
        </div>
    )
}
