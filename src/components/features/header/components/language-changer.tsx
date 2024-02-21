'use client'

import { Dropdown } from '@/components/ui/dropdown'
import { GlobeIcon24 } from '@/components/ui/icons'
import { useChangeLocale, useCurrentLocale } from '@/utils/i18n/i18n.client'

export const LanguageChanger = () => {
    const changeLocale = useChangeLocale()
    const currentLocale = useCurrentLocale()

    const handleChangeLocale = (locale: 'en' | 'ru') => {
        if (currentLocale !== locale) {
            changeLocale(locale)
        }
    }

    return (
        <Dropdown
            items={[
                {
                    caption: 'English',
                    value: 'en',
                    onClick: () => handleChangeLocale('en'),
                },
                {
                    caption: 'Русский',
                    value: 'ru',
                    onClick: () => handleChangeLocale('ru'),
                },
            ]}
            currentItem={currentLocale}
        >
            <div className="link flex items-center gap-x-2 text-big-bold">
                <span className="hidden sm:block">
                    {currentLocale === 'en' && 'English'}
                    {currentLocale === 'ru' && 'Русский'}
                </span>
                <GlobeIcon24 />
            </div>
        </Dropdown>
    )
}
