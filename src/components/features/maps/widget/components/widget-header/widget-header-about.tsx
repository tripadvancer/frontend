'use client'

import { useTranslations } from 'next-intl'

import Link from 'next/link'

import { ExternalLink } from '@/components/ui/external-link'
import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'

export const WidgetHeaderAbout = () => {
    const t = useTranslations()
    const widgetState = useAppSelector(getWidgetState)

    if (widgetState.isAboutOpened) {
        return (
            <div className="flex flex-col gap-y-4 px-4 pb-8 pt-4 sm:px-8 sm:pt-0">
                <div className="flex flex-col gap-y-2">
                    <p>{t('about.description')}</p>
                </div>
                <ul className="flex flex-col gap-y-2">
                    <li>
                        <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>{t('layout.footer.contactUs')}</Link>
                    </li>
                    <li>
                        <Link href="https://help.tripadvancer.com" target="_blank">
                            {t('layout.footer.helpCenter')}
                        </Link>
                    </li>
                    <li>
                        <Link href="/legal/terms-and-conditions" target="_blank">
                            {t('layout.footer.termsAndConditions')}
                        </Link>
                    </li>
                    <li>
                        <Link href="/legal/privacy-policy" target="_blank">
                            {t('layout.footer.privacyPolicy')}
                        </Link>
                    </li>
                    <li>
                        <Link href="/legal/cookie-policy" target="_blank">
                            {t('layout.footer.cookiePolicy')}
                        </Link>
                    </li>
                </ul>

                <div className="flex gap-x-2 text-black-70">
                    <div>{t('layout.footer.copyright')}</div>|
                    <div>
                        {t.rich('layout.footer.poweredByStadiaMaps', {
                            stadiaMapsLink: stadiaMapsLink => (
                                <ExternalLink href="https://stadiamaps.com/">{stadiaMapsLink}</ExternalLink>
                            ),
                        })}
                    </div>
                </div>
            </div>
        )
    }

    return null
}
