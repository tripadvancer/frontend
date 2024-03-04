'use client'

import Link from 'next/link'

import { getWidgetIsAboutOpened } from '@/redux/features/map-slice'
import { useAppSelector } from '@/redux/hooks'
import { useI18n } from '@/utils/i18n/i18n.client'

export const WidgetHeaderAbout = () => {
    const t = useI18n()
    const isAboutOpened = useAppSelector(getWidgetIsAboutOpened)

    if (isAboutOpened) {
        return (
            <div className="flex flex-col gap-y-4 px-4 pb-8 pt-4 sm:px-8 sm:pt-0">
                <div className="flex flex-col gap-y-2">
                    <p>{t('about.title')}</p>
                    <p>{t('about.description')}</p>
                </div>
                <ul className="flex flex-col gap-y-2">
                    <li>
                        <Link href="">Contact Us</Link>
                    </li>
                    <li>
                        <Link href="">Terms and Conditions</Link>
                    </li>
                    <li>
                        <Link href="">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link href="">Cookie Policy</Link>
                    </li>
                </ul>
                <p className="text-black-70">© Tripadvancer, 2024</p>
            </div>
        )
    }

    return null
}
