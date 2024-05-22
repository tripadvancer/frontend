'use client'

import Link from 'next/link'

import { MapIcon24 } from '@/components/ui/icons'
import { useI18n } from '@/utils/i18n/i18n.client'

export const HeaderMap = () => {
    const t = useI18n()

    return (
        <Link href="/maps" className="flex items-center gap-x-2 text-big-bold">
            <MapIcon24 />
            <span className="hidden sm:block">{t('header.link.map')}</span>
        </Link>
    )
}
