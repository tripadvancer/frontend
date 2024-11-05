import { getTranslations } from 'next-intl/server'

import Link from 'next/link'

import { ExternalLink } from '@/components/ui/external-link'
import { XIcon24, YoutubeIcon24 } from '@/components/ui/icons'

export const Footer = async () => {
    const t = await getTranslations()

    return (
        <footer className="bg-white">
            <div className="container relative">
                <div className="border-t border-black-70" />

                <div className="inner-container flex flex-col items-center gap-y-4 py-8">
                    <div className="flex flex-col sm:gap-y-1">
                        <nav className="flex flex-col flex-wrap items-center justify-center gap-x-2 text-black-40 sm:flex-row">
                            <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>{t('layout.footer.contactUs')}</Link>
                            <span className="hidden sm:block">•</span>
                            <Link href="https://help.tripadvancer.com" target="_blank">
                                {t('layout.footer.helpCenter')}
                            </Link>
                        </nav>

                        <nav className="flex flex-col flex-wrap items-center justify-center gap-x-2 text-black-40 sm:flex-row">
                            <Link href="/legal/terms-and-conditions">{t('layout.footer.termsAndConditions')}</Link>
                            <span className="hidden sm:block">•</span>
                            <Link href="/legal/privacy-policy">{t('layout.footer.privacyPolicy')}</Link>
                            <span className="hidden sm:block">•</span>
                            <Link href="/legal/cookie-policy">{t('layout.footer.cookiePolicy')}</Link>
                        </nav>
                    </div>

                    <div className="flex gap-x-4">
                        <Link href="https://twitter.com/tripadvancer_me" className="link-black" target="_blank">
                            <XIcon24 />
                        </Link>
                        <Link href="https://www.youtube.com/@tripadvancer" className="link-black" target="_blank">
                            <YoutubeIcon24 />
                        </Link>
                    </div>

                    <div className="text-center">
                        {t.rich('layout.footer.poweredByStadiaMaps', {
                            stadiaMapsLink: stadiaMapsLink => (
                                <ExternalLink href="https://stadiamaps.com/">{stadiaMapsLink}</ExternalLink>
                            ),
                        })}
                        <div className="text-black-40">{t('layout.footer.copyright')}</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
