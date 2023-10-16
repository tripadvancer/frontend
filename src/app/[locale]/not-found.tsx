import Image from 'next/image'
import Link from 'next/link'

import { getScopedI18n } from '@/utils/i18n.server'

export default async function NotFound() {
    const t = await getScopedI18n('pages.not_found')
    const tCommon = await getScopedI18n('common')

    return (
        <div className="container flex min-h-screen py-16 phone:flex-col tablet:flex-row tablet:items-center tablet:justify-center tablet:gap-16 desktop:flex-row desktop:items-center desktop:justify-center desktop:gap-32">
            <Image
                src="/images/error-404.svg"
                width={352}
                height={406}
                className="grow phone:hidden"
                alt="404"
                priority
            />
            <div className="phone:flex phone:flex-col phone:items-center phone:text-center">
                <Link href="/">
                    <Image src="/images/logo.svg" width={140} height={24} className="mb-16" alt="Tripadvancer" />
                </Link>
                <Image
                    src="/images/error-404.svg"
                    width={352}
                    height={406}
                    className="mb-16 phone:w-72 tablet:hidden desktop:hidden"
                    alt="404"
                    priority
                />
                <h2 className="mb-8 text-3xl font-medium">{t('title')}</h2>
                <p className="mb-8 text-base text-custom-black-70">{t('text')}</p>
                <Link
                    href="/"
                    className="inline-flex h-10 items-center rounded-lg bg-custom-blue-100 px-6 text-center text-sm text-white hover-animated hover:bg-custom-blue-active hover:text-white focus:outline-none"
                >
                    {tCommon('cta.home')}
                </Link>
            </div>
        </div>
    )
}
