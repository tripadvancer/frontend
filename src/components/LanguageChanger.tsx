'use client'

import { useChangeLocale, useCurrentLocale } from '@/locales/client'

export const LanguageChanger = () => {
    const changeLocale = useChangeLocale()
    const locale = useCurrentLocale()

    return (
        <div className="flex gap-2">
            Current locale: {locale}
            <div onClick={() => changeLocale('en')} className="cursor-pointer text-custom-blue-100 hover:text-custom-blue-active">
                En
            </div>
            <div onClick={() => changeLocale('ru')} className="cursor-pointer text-custom-blue-100 hover:text-custom-blue-active">
                Ru
            </div>
        </div>
    )
}
