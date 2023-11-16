import Image from 'next/image'
import Link from 'next/link'

import { LinkButton } from '@/components/link-button'
import { getScopedI18n } from '@/utils/i18n/i18n.server'

export default async function NotFound() {
    const t = await getScopedI18n('pages.not_found')
    const tCommon = await getScopedI18n('common')

    return (
        <div className="container flex min-h-screen flex-col items-center py-16 md:flex-row md:gap-x-8 lg:gap-x-16 xl:gap-x-32">
            <Image
                src="/images/error-404.svg"
                width={352}
                height={406}
                className="hidden grow md:block"
                alt="404"
                priority
            />
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <Link href="/">
                    <Image src="/images/logo.svg" width={140} height={24} className="mb-16" alt="Tripadvancer" />
                </Link>
                <Image
                    src="/images/error-404.svg"
                    width={352}
                    height={406}
                    className="mb-16 md:hidden"
                    alt="404"
                    priority
                />
                <h2 className="mb-8 text-h3-m sm:text-h3">{t('title')}</h2>
                <p className="mb-8 text-big text-black-70">{t('text')}</p>
                <LinkButton href="/">{tCommon('action.return_home')}</LinkButton>
            </div>
        </div>
    )
}
