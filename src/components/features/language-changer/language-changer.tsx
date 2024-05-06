'use client'

import { useMediaQuery } from 'usehooks-ts'

import { Dropdown } from '@/components/ui/dropdown'
import { GlobeIcon16 } from '@/components/ui/icons'
import { useChangeLocale, useCurrentLocale } from '@/utils/i18n/i18n.client'

export const LanguageChanger = () => {
    const changeLocale = useChangeLocale()
    const currentLocale = useCurrentLocale()
    const isMobile = useMediaQuery('(max-width: 639px)')

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
            position={isMobile ? 'center' : 'right'}
            currentItem={currentLocale}
        >
            <div className="link flex-center gap-x-2">
                {currentLocale === 'en' && 'English'}
                {currentLocale === 'ru' && 'Русский'}
                <div className="hidden sm:block">
                    <GlobeIcon16 />
                </div>
            </div>
        </Dropdown>
    )
}
