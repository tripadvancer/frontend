'use client'

import { MapIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import Link from 'next/link'

export const HeaderMap = () => {
    const t = useTranslations()

    return (
        <Link href="/maps" className="flex items-center gap-x-2 text-big-bold">
            <MapIcon />
            <span className="hidden sm:block">{t('layout.header.links.map')}</span>
        </Link>
    )
}
