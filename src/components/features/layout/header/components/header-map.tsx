'use client'

import { useTranslations } from 'next-intl'

import Link from 'next/link'

import { MapIcon24 } from '@/components/ui/icons'

export const HeaderMap = () => {
    const t = useTranslations()

    return (
        <Link href="/maps" className="flex items-center gap-x-2 text-big-bold">
            <MapIcon24 />
            <span className="hidden sm:block">{t('layout.header.links.map')}</span>
        </Link>
    )
}
