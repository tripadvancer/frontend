'use client'

import { useCurrentLocale } from 'next-i18n-router/client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

import i18nConfig from '@/configs/i18n.config'

export const LanguageChanger = () => {
    const router = useRouter()
    const currentPathname = usePathname()
    const currentLocale = useCurrentLocale(i18nConfig)

    const handleChange = (newLocale: string) => {
        // set cookie for next-i18n-router
        const days = 30
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        const expires = '; expires=' + date.toUTCString()
        document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

        if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
            router.push('/' + newLocale + currentPathname)
        } else {
            router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
        }

        router.refresh()
    }

    return (
        <div className="flex gap-2">
            <div
                onClick={() => handleChange('en')}
                className="cursor-pointer text-custom-blue-100 hover:text-custom-blue-active"
            >
                En
            </div>
            <div
                onClick={() => handleChange('ru')}
                className="cursor-pointer text-custom-blue-100 hover:text-custom-blue-active"
            >
                Ru
            </div>
        </div>
    )
}
