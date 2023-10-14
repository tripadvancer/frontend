'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { useScopedI18n } from '@/utils/i18n.client'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const t = useScopedI18n('page.error')
    const tCommon = useScopedI18n('common')

    return (
        <div className="container flex min-h-screen py-16 phone:flex-col phone:px-4 tablet:flex-row tablet:items-center tablet:justify-center tablet:gap-16 desktop:flex-row desktop:items-center desktop:justify-center desktop:gap-32">
            <Image
                src="/images/error-500.svg"
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
                    src="/images/error-500.svg"
                    width={352}
                    height={406}
                    className="mb-16 phone:w-72 tablet:hidden desktop:hidden"
                    alt="404"
                    priority
                />
                <h2 className="mb-8 text-3xl font-medium">{t('title')}</h2>
                <p className="mb-8 text-base text-custom-black-70">{t('text')}</p>
                {/* todo: remove error message */}
                {/* <div className="p-4 font-mono text-xs">{error.message}</div> */}
                <Button type="button" onClick={() => reset()}>
                    {tCommon('cta.try_again')}
                </Button>
            </div>
        </div>
    )
}
