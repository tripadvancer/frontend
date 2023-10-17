import Image from 'next/image'
import Link from 'next/link'

import { LinkButton } from '@/components/LinkButton'
import { getScopedI18n } from '@/utils/i18n.server'

export default async function NotFound() {
    const t = await getScopedI18n('pages.not_found')
    const tCommon = await getScopedI18n('common')

    return (
        <div className="md:flex-row md:gap-x-8 lg:gap-x-16 xl:gap-x-32 container flex min-h-screen flex-col items-center py-16">
            <Image
                src="/images/error-404.svg"
                width={352}
                height={406}
                className="md:block hidden grow"
                alt="404"
                priority
            />
            <div className="md:text-left md:items-start flex flex-col items-center text-center">
                <Link href="/">
                    <Image src="/images/logo.svg" width={140} height={24} className="mb-16" alt="Tripadvancer" />
                </Link>
                <Image
                    src="/images/error-404.svg"
                    width={352}
                    height={406}
                    className="md:hidden mb-16"
                    alt="404"
                    priority
                />
                <h2 className="text-h3-m sm:text-h3 mb-8">{t('title')}</h2>
                <p className="text-black-70 text-big mb-8">{t('text')}</p>
                <LinkButton href="/">{tCommon('cta.home')}</LinkButton>
            </div>
        </div>
    )
}
